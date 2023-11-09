import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import React from "react";

function SelectComp({ notes }) {
  return (
    <div>
      <div className="w-full ">
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel id="note-titles">select note title</InputLabel>
          <Select>
            {notes.map((note) => (
              <MenuItem>{note.newNoteTitle}</MenuItem>
            ))}
            <MenuItem value={10}>Ten</MenuItem>
            <MenuItem value={20}>Twenty</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
          </Select>
        </FormControl>
      </div>
    </div>
  );
}

export default SelectComp;
