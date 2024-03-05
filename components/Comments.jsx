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
import moment from "moment";
//import { Drawer } from "vaul";

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
        <DialogContent className="md:max-h-[500px] overflow-auto no-scrollbar">
          <DialogHeader>
            <DialogTitle>Comments {filteredComments?.length}</DialogTitle>
            <DialogDescription>View all comments</DialogDescription>
          </DialogHeader>
          {filteredComments?.map((data) => {
            const date = moment(data?.createdAt).endOf("day").fromNow();

            return (
              <CommentsSection
                key={data._id}
                recipeComments={data}
                date={date}
              />
            );
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
      <DrawerContent className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
        <DrawerHeader className="text-left">
          <DrawerTitle>Comments {filteredComments.length}</DrawerTitle>
          <DrawerDescription>View all comments</DrawerDescription>
        </DrawerHeader>
        <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]">
          {filteredComments?.map((data) => {
            const date = moment(data?.createdAt).startOf("hour").fromNow();
            console.log(date);
            return (
              <div className="pb-3">
                <CommentsSection
                  key={data._id}
                  recipeComments={data}
                  date={date}
                />
              </div>
            );
          })}
          {/* <CommentTextInput
            setComment={setComment}
            postComment={postComment}
            userId={userId}
            _id={_id}
          /> */}
        </div>

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
  return (
    <div className="border border-gray-500 rounded-xl px-2  pt-1">
      <div className="flex flex-row justify-start gap-3 ">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <Typography>{recipeComments?.comment}</Typography>
      </div>
      <div className="flex justify-end">
        <Typography variant="body2">{date}</Typography>
      </div>
    </div>
  );
};

// const MyDrawer = ()=> {
//   return (
//     <Drawer.Root>
//       <Drawer.Trigger asChild>
//         <button>Open Drawer</button>
//       </Drawer.Trigger>
//       <Drawer.Portal>
//         <Drawer.Overlay className="fixed inset-0 bg-black/40" />
//         <Drawer.Content className="bg-white flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%] rounded-t-[10px]">
//           <div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]">
//             <input
//               className="border border-gray-400 my-8"
//               placeholder="Input"
//             />
//             <p>
//               But I must explain to you how all this mistaken idea of denouncing

//             </p>
//             <input
//               className="border border-gray-400 my-8"
//               placeholder="Input"
//             />
//             <p>
//               On the other hand, we denounce with righteous indignation and
//               </p>
//             <input
//               className="border border-gray-400 my-8"
//               placeholder="Input"
//             />
//           </div>
//         </Drawer.Content>
//       </Drawer.Portal>
//     </Drawer.Root>
//   )}
