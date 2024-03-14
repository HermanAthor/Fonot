"use client";
import { Chatbot } from "@/components/Chatbot";
import CreateReceipe from "@/components/CreateReceipe";
import AppLayout from "@/components/Layouts/AppLayout";
import NavHeader from "@/components/NavHeader";
import { Button } from "@/components/ui/button";
//import { useUser } from "@clerk/nextjs";
import {
  Avatar,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  TextField,
} from "@mui/material";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function CreateNote() {
  const [newNoteTitle, setNewNoteTitle] = useState("");
  const [newNote, setNewNote] = useState("");
  const [category, setCategory] = useState("");
  const [data, setData] = useState([]);
  const { data: session } = useSession();

  // const { user } = useUser();
  let userId = "";
  if (session) {
    userId = session?.user?.id;
  }

  const router = useRouter();

  const handleSubmit = async (e, data) => {
    e.preventDefault();
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/notes`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          userId,
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
      <div className=" container p-2 md:p-10 pt-0 mb-20">
        <div className="text-2xl mb-4">Create a Note</div>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 justify-start items-start"
        >
          <TextField
            value={newNoteTitle}
            onChange={(e) => setNewNoteTitle(e.target.value)}
            className="mt-4"
            label="Note title"
            fullWidth
          />
          <TextField
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            className="mt-4"
            label="Note"
            multiline
            rows={4}
            fullWidth
          />
          <FormControl sx={{ width: "fit-content" }}>
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
          <Button type="submit" className="">
            Create Note
          </Button>
        </form>
        <CreateReceipe />
        {/* <div>
          <div>Get help with recipe ideas</div>
          <Chatbot />
        </div> */}
      </div>
    </AppLayout>
  );
}

export default CreateNote;
