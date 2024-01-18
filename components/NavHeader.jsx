"use client";
//import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";
import Search from "./Search";

function NavHeader({ setSearch }) {
  //const { isLoaded, isSignedIn, user } = useUser();
  const user = "234";

  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentDate = date.toLocaleString("en-DK", options);

  // if (!isLoaded || !isSignedIn || !user) return null;

  return (
    user && (
      <div className="flex justify-center  pt-5 px-5">
        <div className="flex flex-row gap-2 justify-between items-center w-full text-2xl ">
          <div className="md:hidden">
            <Search setSearch={setSearch} />
          </div>

          <div className="flex flex-row justify-center items-center gap-2">
            <div className=" md:hidden">
              profile
              {/* <UserButton afterSignOutUrl="/" /> */}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

export default NavHeader;
