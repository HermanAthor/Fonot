import { logIn } from "@/app/actions";
import { toast } from "sonner";

export const alertUserToSign = () => {
  toast.info("Cannot perform this task", {
    position: "top-center",
    duration: 5000,
    description:
      " You need to be logged in to make a comment: Please consider to log in",
    action: {
      label: "Sign In",
      onClick: () => logIn(),
    },
  });
};
