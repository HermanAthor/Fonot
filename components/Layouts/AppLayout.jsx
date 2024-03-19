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
import { ChatbotModal } from "../Modals/ChatbotModal";

export default function AppLayout({ children }) {
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
          className="  bg-[#d1d2cedb] dark:bg-[#272829]"
        >
          <div className="flex flex-row gap-4 justify-end items-end md:px-24 py-4">
            <ChatbotModal />
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
