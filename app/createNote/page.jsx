"use client";
import AppLayout from "@/components/Layouts/AppLayout";
import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CreateNote() {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(newNote);
    console.log(newNoteTitle);
    console.log(category);

    try {
      const res = await fetch("api/creatNote", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          newNoteTitle,
          newNote,
          category,
        }),
      });
      const { results } = res.json();
      setData(results);
      console.log(data);
      if (res.ok) {
        router.push("/allNotes");
      } else {
        throw new Error("Failed to create a topic");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <AppLayout>
      <div className=" container p-10 pt-0">
        <div className="flex flex-row justify-between items-center">
          <p>Saturday 19 August 2023</p>
          <div className="flex flex-row justify-center items-center gap-2">
            <p>Herman Athor</p>
            <Avatar />
          </div>
        </div>
        <div>Create a Note</div>
        <form onSubmit={handleSubmit} className="flex flex-col">
          <TextField
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            className="mt-4"
            label="Note title"
          />
          <TextField
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mt-4"
            label="Note"
            multiline
            rows={4}
          />
          <FormControl>
            <FormLabel id="demo-radio-buttons-group-label">Category</FormLabel>
            <RadioGroup
              aria-labelledby="demo-radio-buttons-group-label"
              valueclear={category}
              name="radio-buttons-group"
              onChange={(e) => setCategory(e.target.value)}
            >
              <FormControlLabel
                value="money"
                control={<Radio />}
                label="Money"
              />
              <FormControlLabel
                value="todos"
                control={<Radio />}
                label="Todos"
              />
              <FormControlLabel
                value="reminders"
                control={<Radio />}
                label="Reminder"
              />
              <FormControlLabel value="work" control={<Radio />} label="Work" />
            </RadioGroup>
          </FormControl>
          <div>{data && data.map((error) => <div>{error}</div>)}</div>
          <button>Submit</button>
        </form>
      </div>
    </AppLayout>
  );
}

export default CreateNote;
