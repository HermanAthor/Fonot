"use client";

import { useEffect, useState } from "react";

function NotesDetailModal({ id }) {
  const [note, setNote] = useState(null);

  useEffect(() => {
    async function fetchNote() {
      try {
        const response = await fetch(`/api/getOneNote/${id}`);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setNote(data);
      } catch (error) {
        console.error("Error fetching Note:", error);
      }
    }

    fetchNote();
  }, [id]);

  return (
    <div>
      {note ? (
        <>
          <h2>{note.newNoteTitle}</h2>
          <p>Author: {note.newNoteTitle}</p>
          <p>Published Year: {note.newNoteTitle}</p>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}

export default NotesDetailModal;
