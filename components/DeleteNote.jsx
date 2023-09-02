import React from "react";
import DialogComp from "./DialogComp";

function DeleteNote({ isOpen, handleClose }) {
  const handleDelete = () => {
    console.log("deleted");
    handleClose();
  };

  return (
    <>
      <DialogComp
        handleDelete={handleDelete}
        isOpen={isOpen}
        handleClose={handleClose}
        title={"Delete"}
      >
        <h1>Are you sure you want to delete</h1>
      </DialogComp>
    </>
  );
}

export default DeleteNote;
