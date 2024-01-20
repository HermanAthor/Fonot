import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Paper,
} from "@mui/material";
import React from "react";
import RemoveBtn from "./RemoveButton";

function DialogComp({
  children,
  isOpen,
  handleClose,
  title,
  subtitle,
  handleSubmit,
  id,
}) {
  return (
    <>
      <Dialog
        fullWidth
        open={isOpen}
        maxWidth="md"
        onClose={handleClose}
        aria-labelledby="max-width-dialog-title"
      >
        <Paper className="dark:bg-[#5c5e5f]">
          <DialogTitle id="max-width-dialog-title">{title}</DialogTitle>
          <DialogContent>
            <DialogContentText>{subtitle}</DialogContentText>
            {children}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleSubmit}>Update</Button>
            <Button onClick={handleClose}>Cancel</Button>
            <RemoveBtn handleClose={handleClose} id={id} />
          </DialogActions>
        </Paper>
      </Dialog>
    </>
  );
}

export default DialogComp;
