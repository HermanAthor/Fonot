import React from "react";
import NoteDetails from "../NotesDetails";

function DetailsLayout({ children }) {
  return (
    <div>
      <NoteDetails />
      <h1>Navigation</h1>
      {children}
    </div>
  );
}

export default DetailsLayout;
