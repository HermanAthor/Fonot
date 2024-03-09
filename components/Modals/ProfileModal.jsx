import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Typography from "@mui/joy/Typography";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSession } from "next-auth/react";
import { logOut } from "@/app/actions";
export function ProfileModal() {
  const { data: session } = useSession();
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <div className="flex flex-row justify-center items-center gap-2 cursor-pointer">
          <Avatar>
            <AvatarImage src={session?.user?.image} alt="user-dp" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <Typography>{session?.user?.name}</Typography>
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Manage your account</AlertDialogTitle>
          <AlertDialogDescription>
            You can manage your account here. Note: Right now you can only log
            out but in the future you will be able to do more account related
            functionalities
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogAction onClick={() => logOut()}>Log out</AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
