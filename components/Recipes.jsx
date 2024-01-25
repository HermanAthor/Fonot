"use client";
import {
  Avatar,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  IconButton,
  Typography,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoreHorizOutlinedIcon from "@mui/icons-material/MoreHorizOutlined";
import React from "react";
import AppLayout from "./Layouts/AppLayout";
import Tiptap from "./TipTap";

function Recipes() {
  const isLiked = true;
  return (
    <AppLayout>
      <Card
        className={`handle dark:bg-[#a3a8aa]`}
        //onClick={() => ModalOpen(note)}
        sx={{ bgcolor: "#a3a8aa" }}
      >
        <CardHeader
          avatar={
            <Avatar sx={{ bgcolor: "#a3a8aa" }} ariaLabel="category">
              T
            </Avatar>
          }
          title={"newNoteTitle"}
          subheader={"category"}
        />
        <CardContent>
          <Typography variant="body2">
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos
            corporis nam sint impedit repudiandae! Ut repellendus laudantium
            obcaecati praesentium non mollitia hic optio qui iusto impedit sint,
            vel distinctio id
          </Typography>
        </CardContent>
        <CardActions>
          <IconButton>
            <MoreHorizOutlinedIcon />
          </IconButton>
          {isLiked && <FavoriteIcon />}
        </CardActions>
      </Card>
      <Tiptap />
    </AppLayout>
  );
}

export default Recipes;
