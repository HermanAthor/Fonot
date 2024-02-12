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
import Typography from "@mui/joy/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentTextInput from "./CommentTextInput";
import useSWR from "swr";
import { useState } from "react";

const getComments = async () => {
  try {
    const response = await fetch("/api/comments", { cache: "no-store" });
    if (!response.ok) {
      throw new Error("Failed to fetch comments");
    }
    return response.json();
  } catch (error) {
    console.log("Error fetching comments", error);
  }
};

export function Comments({
  isDesktop,
  recipeSlug,
  setComment,
  postComment,
  userId,
  _id,
}) {
  const { data, error, isLoading } = useSWR("/api/comments", getComments);
  const [open, setOpen] = useState(false);
  let comments = [];
  if (!isLoading && !error) {
    comments = data?.results;
  }
  const filteredComments = comments?.filter((newComment) => {
    return newComment.recipeId === recipeSlug;
  });

  if (isDesktop) {
    return (
      <Dialog
        className="max-h-96 overflow-auto"
        open={open}
        onOpenChange={setOpen}
      >
        <DialogTrigger asChild>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-h-[500px] overflow-auto">
          <DialogHeader>
            <DialogTitle>Comments {filteredComments.length}</DialogTitle>
            <DialogDescription>View all comments</DialogDescription>
          </DialogHeader>
          {filteredComments?.map((data) => {
            return <CommentsSection key={data._id} recipeComments={data} />;
          })}

          <CommentTextInput
            setComment={setComment}
            postComment={postComment}
            userId={userId}
            _id={_id}
          />
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <IconButton variant="plain" color="neutral" size="sm">
          <ModeCommentOutlined />
        </IconButton>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader className="text-left">
          <DrawerTitle>Comments {filteredComments.length}</DrawerTitle>
          <DrawerDescription>View all comments</DrawerDescription>
        </DrawerHeader>
        {filteredComments?.map((data) => {
          return <CommentsSection key={data._id} recipeComments={data} />;
        })}
        <CommentTextInput
          setComment={setComment}
          postComment={postComment}
          userId={userId}
          _id={_id}
        />

        {/* <ProfileForm className="px-4" /> */}
        <DrawerFooter className="pt-2">
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const CommentsSection = ({ recipeComments }) => {
  return (
    <div className="flex flex-row justify-start px-2 pt-1 gap-3 border border-gray-500 rounded-xl">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <Typography>{recipeComments?.comment}</Typography>
    </div>
  );
};
