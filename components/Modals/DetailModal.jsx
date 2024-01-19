import React, { useState } from "react";
import DialogComp from "../DialogComp";
import { useTheme } from "@emotion/react";
import {
  Box,
  Card,
  CardActions,
  IconButton,
  TextField,
  useMediaQuery,
} from "@mui/material";
import EditNote from "../EditNote";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { useRouter } from "next/navigation";
import axios from "axios";

function DetailModal({ isOpen, handleClose, note }) {
  const router = useRouter();
  const { newNoteTitle, newNote, category, _id } = note;
  const [editNoteTitle, setEditNoteTitle] = useState(newNoteTitle);
  const [editNote, setEditNote] = useState(newNote);

  const italic = "italic";

  // edit/update Note function
  const handleSubmit = async () => {
    try {
      const res = await fetch(`http://localhost:3000/api/${_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ editNote, editNoteTitle }),
      });

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  // delete Note function
  // const handleDelete = async () => {
  //   const confirmed = confirm("Are you sure?");

  //   if (confirmed) {
  //     const res = await fetch(
  //       `http://localhost:3000/api/deleteNote?id=${_id}`,
  //       {
  //         method: "DELETE",
  //       }
  //     );

  //     if (res.ok) {
  //       router.refresh();
  //       handleClose();
  //       router.refresh();
  //     }
  //   }
  // };

  const handleDelete = async () => {
    confirm("Are you sure?");
    try {
      await axios.delete("/api/notes", { data: { _id } });
      handleClose();
      router.push("/allNotes");
    } catch (error) {
      console.log(error);
      alert("An error occured while deleting your note");
    }
  };

  return (
    <>
      <DialogComp
        isOpen={isOpen}
        handleClose={handleClose}
        title={newNoteTitle}
        handleDelete={handleDelete}
        id={_id}
      >
        <div>
          <div>{newNoteTitle}</div>
          <div>{category}</div>
          <div>
            <Card sx={{ maxWidth: 845, bgcolor: "#c8ccbc", p: "10px" }}>
              <Box className="">
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  variant="standard"
                  value={editNoteTitle}
                  defaultValue={newNoteTitle}
                  onChange={(e) => setEditNoteTitle(e.target.value)}
                  className="mt-4"
                  multiline
                  rows={2}
                />
                <TextField
                  InputProps={{
                    disableUnderline: true,
                  }}
                  variant="standard"
                  defaultValue={newNote}
                  value={editNote}
                  onChange={(e) => setEditNote(e.target.value)}
                  className={`mt-4 w-full ${italic ? "italic" : "not-italic"}`}
                  multiline
                  rows={4}
                />
              </Box>
              <CardActions disableSpacing>
                {/* <IconButton aria-label="add to favorites">
                  <FavoriteIcon
                    onClick={() => setLike((prev) => !prev)}
                    className={`${like ? " text-gray-700" : "text-gray-400"}`}
                  />
                </IconButton>
                <IconButton aria-label="share">
                  <FormatItalicOutlinedIcon
                    onClick={() => setItalic((prev) => !prev)}
                  />
                </IconButton> */}
                <IconButton aria-label="share">
                  <MoreVertIcon />
                </IconButton>
              </CardActions>
            </Card>
          </div>
        </div>
      </DialogComp>
    </>
  );
}

export default DetailModal;
