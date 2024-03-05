"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import IconButton from "@mui/joy/IconButton";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentTextInput from "./CommentTextInput";

import { useState } from "react";
import CardOverflow from "@mui/joy/CardOverflow";
import AspectRatio from "@mui/joy/AspectRatio";
import Box from "@mui/joy/Box";
import { Typography } from "@mui/material";
import RecipeDetails from "./RecipeDetails";

export function RecipeDetailDialog({
  isDesktop,
  thumbnail,
  recipeTitle,
  recipeDesc,
  recipe,
  dietOption,
  files,
}) {
  const [open, setOpen] = useState(false);

  if (isDesktop) {
    return (
      <Dialog
        className="max-h-96 overflow-auto max-w-4xl"
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <CardOverflow>
            <AspectRatio>
              <img src={thumbnail[0]?.url} alt="food" loading="lazy" />
            </AspectRatio>
          </CardOverflow>
        </DialogTrigger>
        <DialogContent className="md:max-h-[600px] overflow-auto no-scrollbar max-w-6xl">
          <DialogHeader>
            <DialogTitle>{recipeTitle} </DialogTitle>
            <DialogDescription>{recipeDesc}</DialogDescription>
          </DialogHeader>
          <RecipeDetails
            thumbnail={thumbnail}
            recipe={recipe}
            dietOption={dietOption}
            files={files}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <CardOverflow>
          <AspectRatio>
            <img src={thumbnail[0]?.url} alt="food" loading="lazy" />
          </AspectRatio>
        </CardOverflow>
      </DrawerTrigger>
      <DrawerContent className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
        <DrawerHeader className="text-left">
          <DrawerTitle>{recipeTitle} </DrawerTitle>
          <DrawerDescription>{recipeDesc}</DrawerDescription>
        </DrawerHeader>
        <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]">
          <RecipeDetails
            thumbnail={thumbnail}
            recipe={recipe}
            dietOption={dietOption}
            files={files}
          />
        </div>
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
