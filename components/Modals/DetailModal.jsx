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
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

function DetailModal({ isOpen, handleClose, note }) {
  const router = useRouter();
  const { newNoteTitle, newNote, category, _id } = note;
  const [editNoteTitle, setEditNoteTitle] = useState(newNoteTitle);
  const [editNote, setEditNote] = useState(newNote);
  const [newCategory, setNewCategory] = useState(category);
  const [like, setLike] = useState(false);
  const [italic, setItalic] = useState(false);

  // edit/update Note function
  const handleSubmit = async () => {
    try {
      const res = await fetch(`/api/notes/${_id}`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          editNote,
          editNoteTitle,
          newCategory,
          italic,
          like,
        }),
      });
      alert("Note updated");

      if (!res.ok) {
        throw new Error("Failed to update topic");
      }

      router.refresh();
      router.push("/allNotes");
    } catch (error) {
      console.log(error);
    }
  };

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
        handleSubmit={handleSubmit}
      >
        <div>
          <div>{newCategory}</div>
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
                <div className="flex flex-col  gap-2">
                  <div>Choose new category</div>
                  <div className="flex  flex-col gap-2 md:flex-row">
                    <span
                      className=" bg-blue-400 rounded-full px-3 cursor-pointer w-fit"
                      onClick={() => setNewCategory("reminders")}
                    >
                      Reminders
                    </span>
                    <span
                      className=" bg-yellow-400 rounded-full px-3  cursor-pointer w-fit"
                      onClick={() => setNewCategory("work")}
                    >
                      {" "}
                      Work
                    </span>
                    <span
                      className=" bg-red-400 rounded-full px-3 cursor-pointer w-fit"
                      onClick={() => setNewCategory("todos")}
                    >
                      todos
                    </span>
                    <span
                      className=" bg-green-400 rounded-full px-3 cursor-pointer w-fit"
                      onClick={() => setNewCategory("money")}
                    >
                      Money
                    </span>
                  </div>
                </div>
              </Box>
              <CardActions disableSpacing>
                <IconButton aria-label="add to favorites">
                  <FavoriteIcon
                    onClick={() => setLike((prev) => !prev)}
                    className={`${like ? " text-gray-700" : "text-gray-400"}`}
                  />
                </IconButton>
                <IconButton aria-label="share">
                  <FormatItalicOutlinedIcon
                    onClick={() => setItalic((prev) => !prev)}
                  />
                </IconButton>
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
