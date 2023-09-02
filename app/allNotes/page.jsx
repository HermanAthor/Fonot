"use client";
import AppLayout from "@/components/Layouts/AppLayout";
import NavHeader from "@/components/NavHeader";
import {
  Avatar,
  Card,
  CardContent,
  CardHeader,
  Container,
  Typography,
} from "@mui/material";
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
        <NavHeader />
        <div className="flex justify-center items-center p-4 mx-24">
          <input
            className="w-full p-3 rounded-3xl mt-3 mb-3 border-2 border-slate-700"
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="px-10">
          <Typography variant="h5">
            {" "}
            You have {filteredNotes.length} Notes
          </Typography>
        </div>
        <div className="container overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 p-5 gap-3">
            {notes &&
              filteredNotes.map((note) => {
                const { category, newNoteTitle, newNote, _id } = note;
                let bgColor = "";
                if (category === "work") {
                  bgColor = "bg-yellow-500";
                } else if (category === "todos") {
                  bgColor = "bg-red-500";
                } else if (category === "reminders") {
                  bgColor = "bg-blue-500";
                } else if (category === "work") {
                  bgColor = "bg-yellow-500";
                } else if (category === "money") {
                  bgColor = "bg-green-500";
                }

                let bgColor1 = "";
                if (category === "work") {
                  bgColor1 = "#f2fa84";
                } else if (category === "todos") {
                  bgColor1 = "#fa7066";
                } else if (category === "reminders") {
                  bgColor1 = "#84ecfa";
                } else if (category === "money") {
                  bgColor1 = "#84fa88";
                }
                return (
                  <Card key={_id} className={`${bgColor}`}>
                    <CardHeader
                      avatar={
                        <Avatar
                          sx={{ bgcolor: bgColor1 }}
                          aria-label="category"
                        >
                          {category[0].toUpperCase()}
                        </Avatar>
                      }
                      title={newNoteTitle}
                      subheader={category}
                    />
                    <CardContent>
                      <Typography variant="body2">{newNote}</Typography>
                    </CardContent>
                  </Card>
                );
              })}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}

export default AllNotes;

/*
<div
  key={_id}
  style={{ backgroundColor: bgColor1 }}
  className="w-full border-2 p-5 gap-3 mx-3 space-x-4 shadow-lg"
>
  <div className="flex flex-col justify-start">
    <div className="flex flex-row gap-2">
      <Avatar className={`${bgColor}`}>
        {category[0].toUpperCase()}
      </Avatar>
      <div className="flex flex-col">
        <p>{newNoteTitle}</p>
        <p>{category}</p>
      </div>
    </div>
    <div className="flex">
      <p className="leading-relaxed">{newNote}</p>
    </div>
  </div>
</div>


*/
