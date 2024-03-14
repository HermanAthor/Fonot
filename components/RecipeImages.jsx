import { ReplaceIcon, Trash2 } from "lucide-react";
import React from "react";
import ToolTip from "./ToolTip";
import { ReplaceImageDialog } from "./ReplaceImageDialog";

const RecipeImages = ({ files, setUpdatedFiles, showImage }) => {
  const deleteUploadedImage = (key) => {
    const filteredFiles = files.filter((item) => item.key !== key);
    setUpdatedFiles(filteredFiles);
  };
  return (
    <div className="flex flex-wrap md:grid md:grid-cols-5 gap-3 py-5">
      {files?.map((file) => (
        <div
          style={{
            backgroundImage: `url(${file.url})`,
            backgroundSize: "cover",
          }}
          className="bg-no-repeat h-24 md:h-36 w-36 rounded-xl relative group"
          key={file.key}
          onClick={() => showImage(file.url)}
        >
          <div
            // onClick={deleteUploadedImage}
            className=" text-center absolute  top-1 right-1 rounded-full px-2 bg-opacity-0 hidden group-hover:flex group-hover:flex-row group-hover:gap-4 group-hover:bg-opacity-80 transition-all duration-500"
          >
            <div className="">
              <ToolTip helperText={"Replace Image"}>
                <ReplaceImageDialog
                  imageKey={file.key}
                  setUpdatedFiles={setUpdatedFiles}
                  updatedFiles={files}
                />
              </ToolTip>
            </div>
            <div className="">
              <ToolTip helperText={"Remove Image"}>
                <Trash2
                  className="text-red-300 hover:text-red-500"
                  onClick={() => deleteUploadedImage(file.key)}
                />
              </ToolTip>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeImages;
