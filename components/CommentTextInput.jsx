import Face from "@mui/icons-material/Face";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
import Textarea from "@mui/joy/Textarea";
import { Button } from "./ui/button";

const CommentTextInput = ({ setComment, postComment, userId, _id }) => {
  return (
    <CardContent orientation="horizontal" sx={{ gap: 1 }}>
      <IconButton size="sm" variant="plain" color="neutral" sx={{ ml: -1 }}>
        <Face />
      </IconButton>
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        multiline={true}
        maxRows="3"
        variant="plain"
        size="sm"
        placeholder="Add a comment…"
        sx={{ flex: 1, px: 0, "--Input-focusedThickness": "0px" }}
      />
      <Button
        onClick={() => postComment(userId, _id)}
        underline="none"
        role="button"
      >
        Post
      </Button>
    </CardContent>
  );
};

export default CommentTextInput;
