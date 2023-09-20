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

function DialogComp({
  children,
  isOpen,
  handleClose,
  title,
  subtitle,
  handleDelete,
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDelete}>Delete</Button>
          </DialogActions>
        </Paper>
      </Dialog>
    </>
  );
}

export default DialogComp;
