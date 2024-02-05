import React from "react";
import Textarea from "@mui/joy/Textarea";

const CommentTextInput = () => {
  return (
    <Textarea
      multiline={true}
      maxRows="3"
      variant="plain"
      size="sm"
      placeholder="Add a comment…"
      sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
    />
  );
};

export default CommentTextInput;
