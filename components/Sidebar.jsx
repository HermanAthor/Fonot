"use client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React, { useEffect, useState } from "react";

export default function Sidebar() {
  const [notesList, setNotesList] = useState([]);
  useEffect(() => {
    fetch("/api/getNote")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotesList(data.results);
        }
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  return (
    <Grid item xs={12} className="b-[#fbfcf7] h-screen">
      <Box className="min-h-screen w-full overflow-y-auto mt-10 flex flex-col justify-start items-start p-4">
        <Typography variant="h4">Notes</Typography>
        <div className="flex flex-col justify-start items-start space-y-4">
          <Link
            className="flex items-center hover:bg-[#e8edd5] p-2"
            href={"/allNotes"}
          >
            <SubjectOutlinedIcon className="text-amber-600 text-5xl md:2xl" />
            <h6 className="ml-2 text-xl">All Notes</h6>
          </Link>
          <Link
            className="flex items-center hover:bg-[#e8edd5] p-2"
            href={"/mynotes"}
          >
            <SubjectOutlinedIcon className="text-amber-600 text-5xl md:2xl" />
            <h6 className="ml-2 text-xl">My Notes</h6>
          </Link>
          <Link
            className="flex items-center hover:bg-[#e8edd5] p-2"
            href={"/createNote"}
          >
            <AddCircleOutlineOutlinedIcon className="text-amber-600 text-5xl md:2xl" />
            <h6 className="ml-2 text-xl">Create Note</h6>
          </Link>
          <ul className="overflow-y-auto flex-grow">
            {notesList.map((note) => (
              <Link href={`/noteDetails/${note._id}`}>
                <li key={note._id} className="p-2">
                  {note.newNoteTitle}
                </li>
              </Link>
            ))}
          </ul>
        </div>
      </Box>
    </Grid>
  );
}
