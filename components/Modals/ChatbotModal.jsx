"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

import { useState } from "react";

import { Chatbot } from "../Chatbot";
import { useMediaQuery } from "@mui/material";
import { CopyGeneratedText } from "../CopyGeneratedText";

export function ChatbotModal() {
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog
        className="max-h-96 overflow-auto"
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <Button>Help?</Button>
        </DialogTrigger>
        <DialogContent className="bg-white flex flex-col  max-h-[70%] rounded-t-[10px] max-w-4xl">
          <DialogHeader>
            <DialogTitle>Prompt the AI for recipe suggestions</DialogTitle>
            <DialogDescription>
              Note: The AI can't know your recipe it is here to make it easier
              for you to create your recipe
            </DialogDescription>
          </DialogHeader>

          <Chatbot />
          <DialogFooter>
            <DialogClose>
              {" "}
              <CopyGeneratedText />
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button>Help!</Button>
      </DrawerTrigger>
      <DrawerContent className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Prompt the AI for recipe suggestions</DrawerTitle>
          <DrawerDescription>
            Note: The AI can't know your recipe it is here to make it easier for
            you to create your recipe
          </DrawerDescription>
        </DrawerHeader>
        <Chatbot />
        <DrawerFooter className="pt-2">
          <CopyGeneratedText />
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
