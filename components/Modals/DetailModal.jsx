import React from "react";
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

function DetailModal({ isOpen, handleClose, note }) {
  const { newNoteTitle, newNote, category } = note;
  const italic = "italic";
  return (
    <>
      <DialogComp
        isOpen={isOpen}
        handleClose={handleClose}
        title={newNoteTitle}
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
                  //value={editNoteTitle}
                  defaultValue={newNoteTitle}
                  // onChange={(e) => setEditNoteTitle(e.target.value)}
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
                  // value={editNote}
                  // onChange={(e) => setEditNote(e.target.value)}
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
