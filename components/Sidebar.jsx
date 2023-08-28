import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React from "react";

export default function Sidebar() {
  return (
    <Grid item xs={2} className="b-[#fbfcf7]">
      <Box className="min-h-screen w-full overflow-y-auto mt-10 flex flex-col justify-start items-start">
        <Typography className="p-4" variant="h4">
          Notes
        </Typography>
        <div className="flex flex-col justify-center px-3">
          <div className="flex flex-row justify-start items-start hover:bg-[#e8edd5] flex-wrap">
            <Link href={"/allNotes"}>
              <SubjectOutlinedIcon className=" text-amber-600 text-5xl md:2xl" />
            </Link>
            <Link href={"/allNotes"}>All Notes</Link>
          </div>
          <div className="flex flex-row justify-center items-center hover:bg-[#e8edd5] flex-wrap">
            <Link href={"/createNote"}>
              <AddCircleOutlineOutlinedIcon className=" text-amber-600 text-5xl md:2xl " />
            </Link>
            <Link href={"/createNote"}>Create Note</Link>
          </div>
        </div>
      </Box>
    </Grid>
  );
}

/*
<Link href={"/createNote"}>
  
  <span className="hidden md:inline-block text-xl">
    Create Note
  </span>
</Link>

*/
