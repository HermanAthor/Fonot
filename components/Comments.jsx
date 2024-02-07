// import { useMediaQuery } from "@/hooks/use-media-query";
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
import { useMediaQuery } from "@mui/material";
import { useEffect, useState } from "react";
import IconButton from "@mui/joy/IconButton";
import ModeCommentOutlined from "@mui/icons-material/ModeCommentOutlined";
import Typography from "@mui/joy/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CommentTextInput from "./CommentTextInput";

export function Comments({ recipeSlug }) {
  const [open, setOpen] = useState(false);
  const [comments, setComments] = useState([]);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  useEffect(() => {
    fetch("/api/comments", { cache: "no-cache" })
      .then((response) => response.json())
      .then((data) => {
        if (data.success) {
          setComments(data.results);
        }
      })
      .catch((error) => console.error("Error fetching comments:", error));
  }, []);

  const filteredComments = comments.filter((newComment) => {
    return newComment.recipeId === recipeSlug;
  });

  if (isDesktop) {
    return (
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <IconButton variant="plain" color="neutral" size="sm">
            <ModeCommentOutlined />
          </IconButton>
          {/* <Button variant="outline">Edit Profile</Button> */}
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Comments {filteredComments.length}</DialogTitle>
            <DialogDescription>View all comments</DialogDescription>
          </DialogHeader>
          {filteredComments?.map((data) => {
            return <CommentsSection key={data._id} recipeComments={data} />;
          })}
          <CommentsSection />
          <CommentTextInput />
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
        <CommentsSection />
        <CommentsSection />

        <CommentTextInput />

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
