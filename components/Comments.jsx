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
import dayjs from "dayjs";
import Box from "@mui/joy/Box";
import { getInitials } from "@/lib/getInitials";
import relativeTime from "dayjs/plugin/relativeTime";

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
  dayjs.extend(relativeTime);
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
            <ModeCommentOutlined className="dark:text-gray-400" />
          </IconButton>
        </DialogTrigger>
        <DialogContent className="bg-white flex flex-col  max-h-[70%] rounded-t-[10px] max-w-4xl">
          <DialogHeader>
            <DialogTitle>Comments {filteredComments?.length}</DialogTitle>
            <DialogDescription>View all comments</DialogDescription>
          </DialogHeader>
          {/* this is a local component */}
          <TheComments filteredComments={filteredComments} />
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
      <DrawerContent className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Comments {filteredComments.length}</DrawerTitle>
          <DrawerDescription>View all comments</DrawerDescription>
        </DrawerHeader>
        {/* This is a local component */}
        <TheComments filteredComments={filteredComments} />
        <DrawerFooter className="pt-2">
          <CommentTextInput
            setComment={setComment}
            postComment={postComment}
            userId={userId}
            _id={_id}
          />
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

const CommentsSection = ({ recipeComments, date }) => {
  const userInitials = getInitials(recipeComments?.userName);
  return (
    <div>
      <div className="flex flex-row justify-start gap-3 pb-3">
        <Avatar>
          <AvatarImage src={recipeComments?.userImage} alt="@userName" />
          <AvatarFallback>{userInitials}</AvatarFallback>
        </Avatar>
        <Box className="border border-gray-100 bg-gray-100 rounded-xl px-2  pt-1">
          <Typography className="font-bold">
            {recipeComments?.userName}
          </Typography>
          <Typography>{recipeComments?.comment}</Typography>
          <div className="flex justify-end">
            <Typography variant="body2">{date}</Typography>
          </div>
        </Box>
      </div>
      {/* <div className="flex justify-end">
        <Typography variant="body2">{date}</Typography>
      </div> */}
    </div>
  );
};

const TheComments = ({ filteredComments }) => {
  return (
    <div className="w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px] no-scrollbar">
      {filteredComments?.map((data) => {
        const dateFormat = data?.createdAt;
        const transformedDate = dayjs(dateFormat);
        const date = transformedDate.fromNow();
        return (
          <CommentsSection key={data._id} recipeComments={data} date={date} />
        );
      })}
    </div>
  );
};
