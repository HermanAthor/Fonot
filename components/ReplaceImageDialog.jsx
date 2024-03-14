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

import { ImagePlus } from "lucide-react";
import { useState } from "react";
export function ReplaceImageDialog({
  updatedFiles,
  imageKey,
  setUpdatedFiles,
}) {
  const [file, setFile] = useState([]);
  const imageUrl = file[0]?.url;
  //   const setUrl = (url) => {
  //     editor.chain().focus().setImage({ src: url }).run();
  //     setFile([]);
  //   };
  console.log(file);
  //Delete the image
  const deleteUploadedImage = (key) => {
    const filteredFiles = updatedFiles.filter((item) => item.key !== key);
    setUpdatedFiles(filteredFiles);
  };

  const replaceImage = () => {
    deleteUploadedImage(imageKey);
    setUpdatedFiles((prevFiles) => [...prevFiles, file[0]]);
    // setUpdatedFiles(...updatedFiles, file);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <ImagePlus className="h-4 w-4" />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Replace Image</AlertDialogTitle>
          <AlertDialogDescription>
            {imageUrl === undefined ? (
              "Upload image to generate image url"
            ) : (
              <ImageToReplace imageUrl={imageUrl} />
            )}
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
          onClick={replaceImage}
          disabled={imageUrl === undefined}
        >
          Upload URL
        </AlertDialogAction>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
      </AlertDialogContent>
    </AlertDialog>
  );
}
const ImageToReplace = ({ imageUrl }) => {
  return (
    <div
      style={{
        backgroundImage: `url(${imageUrl})`,
        backgroundSize: "cover",
      }}
      className="bg-no-repeat h-24 md:h-36 w-36 rounded-xl relative group"
    ></div>
  );
};
