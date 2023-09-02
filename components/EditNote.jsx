import { ExpandMore } from "@mui/icons-material";
import { Box, Card, CardActions, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FormatItalicOutlinedIcon from "@mui/icons-material/FormatItalicOutlined";

function EditNote({ edit }) {
  const [editNoteTitle, setEditNoteTitle] = useState("");
  const [editNote, setEditNote] = useState("");
  const [like, setLike] = useState(false);
  const [italic, setItalic] = useState(false);

  return (
    <div>
      {edit && (
        <form className="flex flex-col ">
          <Card sx={{ maxWidth: 845 }}>
            <Box className="">
              <TextField
                value={editNoteTitle}
                onChange={(e) => setEditNoteTitle(e.target.value)}
                className="mt-4"
                label="Note title"
                multiline
                rows={2}
              />
              <TextField
                value={editNote}
                onChange={(e) => setEditNote(e.target.value)}
                className={`mt-4 w-full ${italic ? "italic" : "not-italic"}`}
                label="Note"
                multiline
                rows={4}
              />
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
        </form>
      )}
    </div>
  );
}

export default EditNote;
