"use client";
import { UserButton, useAuth, useUser } from "@clerk/nextjs";
import { Avatar } from "@mui/material";
import Link from "next/link";
import React from "react";

function NavHeader() {
  const { isLoaded, isSignedIn, user } = useUser();

  const date = new Date();

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const currentDate = date.toLocaleString("en-DK", options);

  if (!isLoaded || !isSignedIn) return null;

  return (
    user && (
      <div className="flex justify-center px-10 pt-5">
        <div className="flex flex-row justify-between items-center w-full text-2xl ">
          <p>{currentDate}</p>
          <div className="flex flex-row justify-center items-center gap-2">
            <p>{user.firstName}</p>
            <UserButton afterSignOutUrl="/" />
          </div>
        </div>
      </div>
    )
  );
}

export default NavHeader;
