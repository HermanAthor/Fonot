"use client";
import { Box, Grid, Typography } from "@mui/material";
import Link from "next/link";
import Sidebar from "../Sidebar";

export default function AppLayout({ children }) {
  return (
    <div className="fixed min-h-screen overflow-hidden w-full no-scrollbar">
      <Grid container spacing={0}>
        <Grid item xs={2} className="">
          <div className="flex flex-col items-center justify-center overflow-y-scroll max-h-screen w-full bg-white no-scrollbar">
            <Grid
              container
              direction="column"
              justifyContent="center"
              alignItems="center"
              className=" bg-white"
            >
              <Sidebar />
            </Grid>
          </div>
        </Grid>
        <Grid item xs={10} className="border-2 border-l-slate-400">
          <div className="flex flex-col items-center justify-center overflow-y-scroll max-h-screen w-full no-scrollbar">
            {children}
          </div>
        </Grid>
      </Grid>
    </div>
  );
}

/*
<Grid container spacing={0} className="">
      <Grid item xs={2}>
        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="center"
          className=" bg-black"
        >
          <Sidebar />
        </Grid>
      </Grid>
      <Sidebar />
      <Grid
        item
        xs={10}
        className="bg-[#e8edd5] w-full min-h-[716px] overflow-hidden fixed right-0"
      >
        {children}
      </Grid>
    </Grid>

    */
