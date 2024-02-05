"use client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
// import React, { useEffect, useState } from "react";
import ViewListIcon from "@mui/icons-material/ViewList";
import Image from "next/image";
// import Skeleton from "react-loading-skeleton";
// This side bar is only for md screens and above
export default function Sidebar() {
  // const [notesList, setNotesList] = useState([]);
  // useEffect(() => {
  //   fetch("/api/notes")
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.success) {
  //         setNotesList(data.results);
  //       }
  //     })
  //     .catch((error) => console.error("Error fetching notes:", error));
  // }, []);

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
        <div className="flex flex-col justify-start items-start align-middle ">
          <Link href={"/allNotes"}>
            <div className="flex items-center hover:bg-[#e8edd5] p-2 flex-row justify-center align-middle">
              <ViewListIcon
                sx={{ fontSize: { xs: "60px", md: "60px" } }}
                className="text-amber-600 "
              />
              <h6 className="ml-2 text-lg md:text-2xl">Notes</h6>
            </div>
          </Link>
          <Link href={"/personal"}>
            <div className="flex items-center hover:bg-[#e8edd5] flex-row justify-center align-middle">
              <SubjectOutlinedIcon
                sx={{ fontSize: { xs: "60px", md: "60px" } }}
                className="text-amber-600 l"
              />
              <h6 className="ml-2 text-lg md:text-2xl">Personal</h6>
            </div>
          </Link>
          <Link href={"/recipes"}>
            <div className="flex items-center hover:bg-[#e8edd5] p-2 flex-row justify-center align-middle">
              <SubjectOutlinedIcon
                sx={{ fontSize: { xs: "60px", md: "60px" } }}
                className="text-amber-600 l"
              />
              <h6 className="ml-2 text-lg md:text-2xl">Recipes</h6>
            </div>
          </Link>
          <Link href={"/createNote"}>
            <div className="flex items-center hover:bg-[#e8edd5] p-2 flex-row justify-center align-middle">
              <AddCircleOutlineOutlinedIcon
                sx={{ fontSize: { xs: "60px", md: "60px" } }}
                className="text-amber-600 text-5xl md:2xl"
              />
              <h6 className="ml-2 text-lg md:text-2xl ">Create</h6>
            </div>
          </Link>
        </div>
      </Box>
    </Grid>
  );
}
