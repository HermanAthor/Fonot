"use client";
import { Box, Grid, Typography } from "@mui/material";
import Sidebar from "../Sidebar";
import BottomNavigation from "../BottomNavigation";
import { useEffect, useState } from "react";
import { ToggleDarkMode } from "../ToggleDarkMode";
import { ProfileModal } from "../Modals/ProfileModal";
import { logIn } from "@/app/actions";
import { useSession } from "next-auth/react";
import { Button } from "../ui/button";
import { useRecoilState, useRecoilValue } from "recoil";
import { generatedRecipeState } from "../providers/stateStore";
import copy from "copy-to-clipboard";

export default function AppLayout({ children }) {
  const [generatedRecipe, setGeneratedRecipe] =
    useRecoilState(generatedRecipeState);
  const [copyStatus, setCopyStatus] = useState(false);
  // function to run when recipe is copied
  const onCopy = () => {
    setCopyStatus(true);
    setTimeout(() => setCopyStatus(false), 2000);
  };

  const [isSmallScreen, setIsSmallScreen] = useState(
    typeof window !== "undefined" ? window.innerWidth <= 768 : false
  );
  const { data: session } = useSession();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setIsSmallScreen(window.innerWidth <= 768);
      };

      window.addEventListener("resize", handleResize);

      // Cleanup the event listener on unmount
      return () => {
        window.removeEventListener("resize", handleResize);
      };
    }
  }, []);
  console.log(generatedRecipe);
  if (generatedRecipe) {
    setGeneratedRecipe(generatedRecipe);
  }
  const textToCopy = <p>{generatedRecipe}</p>;
  return (
    <div className="fixed min-h-screen w-full overflow-auto no-scrollbar">
      <Grid container spacing={0}>
        <Grid
          item
          xs={2}
          className="w-full hidden md:flex bg-[#d1d2cedb] dark:bg-[#272829]"
        >
          <div className="flex flex-col items-center justify-center overflow-y-scroll max-h-screen w-full no-scrollbar">
            <Sidebar />
          </div>
        </Grid>
        <Grid
          item
          xs={12}
          md={10}
          className="border-2 bg-[#eaefefdb] dark:bg-[#242425]"
        >
          <div className="flex flex-row gap-4 justify-end items-end md:px-24 py-4">
            <Button onClick={() => copy(textToCopy)}>
              Copy generated recipe
            </Button>

            <Button className="text-green-500" variant="link" disabled>
              Copied!
            </Button>

            <ToggleDarkMode />
            <div className="flex flex-row justify-center items-center gap-3">
              {session ? (
                <ProfileModal />
              ) : (
                <div>
                  <form action={() => logIn()}>
                    <Button type="submit">Sign In</Button>
                  </form>
                </div>
              )}
            </div>
          </div>
          <div className="flex flex-col items-center overflow-y-scroll max-h-screen w-full no-scrollbar relative">
            {children}

            <div className="mt-20 md:hidden flex flex-col items-center overflow-y-scroll max-h-screen w-full no-scrollbar">
              {isSmallScreen && <BottomNavigation />}
            </div>
          </div>
        </Grid>
      </Grid>
    </div>
  );
}
