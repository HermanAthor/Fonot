"use client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React, { useEffect, useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import Image from "next/image";
import Skeleton from "react-loading-skeleton";

export default function Sidebar() {
  const [notesList, setNotesList] = useState([]);
  useEffect(() => {
    fetch("/api/notes")
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setNotesList(data.results);
        }
      })
      .catch((error) => console.error("Error fetching notes:", error));
  }, []);

  return (
    <Grid item xs={12} className=" h-screen">
      <Box className="min-h-screen w-full overflow-y-auto mt-10 flex flex-col justify-start items-start p-4 pl-0">
        <div className="mb-10">
          <Image
            src={"/images/noteslogo.svg"}
            width={200}
            height={200}
            alt="noteslogo"
          />
        </div>
        <div className="flex flex-col justify-start items-start ">
          <Link href={"/allNotes"}>
            <div className="flex items-center hover:bg-[#e8edd5] p-2 flex-col md:flex-row justify-center align-middle">
              <ViewListIcon
                sx={{ fontSize: { xs: "60px", md: "40px" } }}
                className="text-amber-600 "
              />
              <h6 className="ml-2 text-lg md:text-2xl">
                {" "}
                All <span className="hidden md:inline">Notes</span>
              </h6>
            </div>
          </Link>
          <Link href={"/mynotes"}>
            <div className="flex items-center hover:bg-[#e8edd5] p-2 flex-col md:flex-row justify-center align-middle">
              <SubjectOutlinedIcon
                sx={{ fontSize: { xs: "60px", md: "40px" } }}
                className="text-amber-600 l"
              />
              <h6 className="ml-2 text-lg md:text-2xl">
                {" "}
                <span className="hidden md:inline">My </span>Notes
              </h6>
            </div>
          </Link>
          <Link href={"/recipes"}>
            <div className="flex items-center hover:bg-[#e8edd5] p-2 flex-col md:flex-row justify-center align-middle">
              <SubjectOutlinedIcon
                sx={{ fontSize: { xs: "60px", md: "40px" } }}
                className="text-amber-600 l"
              />
              <h6 className="ml-2 text-lg md:text-2xl">
                {" "}
                <span className="hidden md:inline">Recipes</span>
              </h6>
            </div>
          </Link>
          <Link href={"/createNote"}>
            <div className="flex items-center hover:bg-[#e8edd5] p-2 flex-col md:flex-row justify-center align-middle">
              <AddCircleOutlineOutlinedIcon
                sx={{ fontSize: { xs: "60px", md: "40px" } }}
                className="text-amber-600 text-5xl md:2xl"
              />
              <h6 className="ml-2 text-lg ">
                {" "}
                Create <span className="hidden md:inline">Note</span>
              </h6>
            </div>
          </Link>
          {/* <ul className="hidden overflow-y-auto md:flex md:flex-grow flex-col">
            {notesList.map((note) => (
              <Link href={`/allNotes/${note._id}`}>
                <li key={note._id} className="p-2">
                  {note.newNoteTitle || <Skeleton />}
                </li>
              </Link>
            ))}
          </ul> */}
        </div>
      </Box>
    </Grid>
  );
}
