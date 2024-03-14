import Face from "@mui/icons-material/Face";
import CardContent from "@mui/joy/CardContent";
import IconButton from "@mui/joy/IconButton";
// import Textarea from "@mui/joy/Textarea";
import { Button } from "./ui/button";
import { Textarea } from "./ui/textarea";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { getInitials } from "@/lib/getInitials";

const CommentTextInput = ({ setComment, postComment, userId, _id }) => {
  const { data: session } = useSession();
  const userInitials = getInitials(session?.user?.name);
  return (
    <CardContent orientation="horizontal" sx={{ gap: 1 }}>
      <Avatar>
        <AvatarImage src={session?.user?.image} alt="user-dp" />
        <AvatarFallback>{userInitials}</AvatarFallback>
      </Avatar>
      <Textarea
        onChange={(e) => setComment(e.target.value)}
        multiline={true}
        maxRows="4"
        placeholder="Add a comment…"
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
