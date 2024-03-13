import AspectRatio from "@mui/joy/AspectRatio";
import React from "react";
import { Button } from "./ui/button";
import { UploadButton } from "@uploadthing/react";
import Typography from "@mui/joy/Typography";

const EditableImage = ({ image, setUpdatedThumbnail }) => {
  return (
    <div
      className="relative group"
      style={{ background: `url(${image})`, backgroundSize: "cover" }}
    >
      <AspectRatio objectFit="cover" ratio={"4/3"}>
        <img src={image} alt="recipe" loading="lazy" />
      </AspectRatio>
      <div className="overlay items-center justify-center absolute top-0 left-0 w-full h-full bg-[#ffffff] bg-opacity-0 hidden group-hover:flex group-hover:flex-col group-hover:gap-4 group-hover:bg-opacity-80 transition-all duration-500 ">
        <Typography>You can replace this image if you wish to</Typography>
        <UploadButton
          endpoint="thumbnailUploader"
          onClientUploadComplete={(res) => {
            setUpdatedThumbnail(res);
            console.log("Files: ", res);
          }}
          onUploadError={(error) => {
            alert(`ERROR! ${error.message}`);
          }}
        />
      </div>
    </div>
  );
};

export default EditableImage;
