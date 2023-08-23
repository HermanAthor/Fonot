import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import SubjectOutlinedIcon from "@mui/icons-material/SubjectOutlined";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import React from "react";

export default function Sidebar() {
  return (
    <Grid item xs={2} className="b-[#fbfcf7]">
      <Box className="min-h-screen w-full overflow-y-auto mt-10">
        <Typography variant="h4"> My Notes</Typography>
        <ul>
          <li className=" hover:bg-[#e8edd5]">
            {" "}
            <SubjectOutlinedIcon className=" text-amber-600" />
            <Link href={"/allNotes"}>All Notes</Link>
          </li>
          <li className=" hover:bg-[#e8edd5]">
            {" "}
            <AddCircleOutlineOutlinedIcon />
            <Link href={"/createNote"}>create Note</Link>
          </li>
        </ul>
      </Box>
    </Grid>
  );
}

/*
<Grid
      item
      xs={2}
      className="bg-[#fbfcf7] w-full min-h-[716px] overflow-hidden fixed left-0"
    >
      <Box className="min-h- w-full overflow-y-auto">
        <Typography variant="h4"> My Notes</Typography>
        <ul>
          <li className=" hover:bg-[#e8edd5]">
            {" "}
            <SubjectOutlinedIcon className=" text-amber-600" />
            <Link href={"/allNotes"}>All Notes</Link>
          </li>
          <li className=" hover:bg-[#e8edd5]">
            {" "}
            <AddCircleOutlineOutlinedIcon />
            <Link href={"/createNote"}>create Note</Link>
          </li>
        </ul>
      </Box>
    </Grid>

*/
