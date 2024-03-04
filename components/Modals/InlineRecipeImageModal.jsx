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
import { UploadButton } from "@uploadthing/react";
import { Toggle } from "../ui/toggle";
import { ImagePlus } from "lucide-react";
import { useState } from "react";
export function InlineRecipeImageModal({ editor }) {
  const [file, setFile] = useState([]);
  const imageUrl = file[0]?.url;
  const setUrl = (url) => {
    editor.chain().focus().setImage({ src: url }).run();
    setFile([]);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Toggle variant="outline">
          <ImagePlus className="h-4 w-4" />
        </Toggle>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Upload Image</AlertDialogTitle>
          <AlertDialogDescription>
            {imageUrl === undefined
              ? "Upload image to generate image url"
              : `${imageUrl}`}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <UploadButton
          endpoint="inlineRecipeImage"
          onClientUploadComplete={(res) => {
            setFile(res);

            console.log("Files: ", res);
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
        <AlertDialogAction
          onClick={() => setUrl(imageUrl)}
          disabled={imageUrl === undefined}
        >
          Upload URL
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
