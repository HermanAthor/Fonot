"use client";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import AppLayout from "@/components/Layouts/AppLayout";
import EditNote from "@/components/EditNote";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import DialogComp from "@/components/DialogComp";
import DeleteNote from "@/components/DeleteNote";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

// const ExpandMore = styled((props) => {
//   const { expand, ...other } = props;
//   return <IconButton {...other} />;
// })(({ theme, expand }) => ({
//   transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
//   marginLeft: "auto",
//   transition: theme.transitions.create("transform", {
//     duration: theme.transitions.duration.shortest,
//   }),
// }));

export default function NoteDetails() {
  const [edit, setEdit] = useState(false);

  const [isOpen, setIsOpen] = useState(false);

  const handleEdit = () => {
    setEdit(!edit);
  };

  const handleOpen = () => {
    setIsOpen(true);
  };
  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <AppLayout>
      <div className="flex flex-col items-center justify-center overflow-y-scroll max-h-screen w-full no-scrollbar">
        <div className=" overflow-y-auto">
          <Card sx={{ maxWidth: 845 }} className="">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  H
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <DeleteOutlinedIcon
                    className=" hover:text-red-400"
                    onClick={handleOpen}
                  />
                </IconButton>
              }
              title="Nextjs Vs React"
              subheader="September 23, 2020"
            />
            {/* Don't know if i wanna impliment this yet */}
            {/* <CardMedia
              component="img"
              height="194"
              image="/images/notes-photo.jpg"
              alt="Paella dish"
            /> */}
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo,
                ipsum delectus. Nulla cupiditate dolore veritatis ea nihil.
                Exercitationem, temporibus eveniet eaque amet repellat doloribus
                cupiditate dicta aliquid. Ratione, sed sint!
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton onClick={handleEdit} aria-label="add to favorites">
                <EditNoteOutlinedIcon fontSize="large" />
              </IconButton>
              <IconButton aria-label="share">
                <MoreVertIcon />
              </IconButton>
            </CardActions>
          </Card>
          <DeleteNote isOpen={isOpen} handleClose={handleClose} />
          <EditNote edit={edit} />
        </div>
      </div>
    </AppLayout>
  );
}
