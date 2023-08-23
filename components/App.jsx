"use client";
import AppLayout from "@/components/Layouts/AppLayout";
import { fetchNotes } from "@/libs/fetchNotes";
import React from "react";
import { useState, useEffect } from "react";

function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch data when the component mounts
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

  return (
    <AppLayout>
      <div>
        <h1>Notes List</h1>
        <ul>
          {notes &&
            notes.map((note) => (
              <div className="text-black" key={note._id}>
                {note.newNoteTitle}
              </div>
            ))}
        </ul>
      </div>
    </AppLayout>
  );
}

export default App;
