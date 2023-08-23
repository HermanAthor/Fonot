"use client";
import AppLayout from "@/components/Layouts/AppLayout";
import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";

function AllNotes() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetch("/api/getNote")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotes(data.results);
          console.log(notes);
        }
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  const filteredNotes = notes.filter((filteredNote) => {
    if (search === "") {
      return filteredNote;
    } else if (
      filteredNote.newNoteTitle.toLowerCase().includes(search.toLowerCase()) ||
      filteredNote.newNote.toLowerCase().includes(search.toLowerCase()) ||
      filteredNote.category.toLowerCase().includes(search.toLowerCase())
    ) {
      return filteredNote;
    }
  });

  return (
    <AppLayout>
      <div className="overflow-y-auto">
        <div className="flex flex-row justify-between items-center px-10 py-1">
          <p>Saturday 19 August 2023</p>
          <div className="flex flex-row justify-center items-center gap-2">
            <p>Herman Athor</p>
            <Avatar />
          </div>
        </div>
        <div>
          <input
            className="w-full p-3 rounded-3xl mt-3 mb-3"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="container overflow-y-auto">
          <div className="grid grid-cols-3 p-5">
            {notes &&
              filteredNotes.map((note) => {
                return (
                  <div className="w-full border-2 p-5 bg-white gap-3 rounded-2xl">
                    <div className="flex flex-col justify-start">
                      <div className="flex flex-row gap-2">
                        <Avatar>A</Avatar>
                        <div className="flex flex-col">
                          <p>{note.newNoteTitle}</p>
                          <p>{note.category}</p>
                        </div>
                      </div>
                      <div className="flex">
                        <p className="leading-relaxed">{note.newNote}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AllNotes;
