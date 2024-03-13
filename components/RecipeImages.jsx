import { Replace, ReplaceIcon, Trash2 } from "lucide-react";
import React from "react";
import ToolTip from "./ToolTip";
import Toolbar from "./Toolbar";

const RecipeImages = ({ files }) => {
  return (
    <div className="flex flex-wrap md:grid md:grid-cols-5 gap-3 py-5">
      {files?.map((file) => (
        <div
          style={{
            backgroundImage: `url(${file.url})`,
            backgroundSize: "cover",
          }}
          className="bg-no-repeat h-24 md:h-36 w-36 rounded-xl relative group"
        >
          <div
            // onClick={deleteUploadedImage}
            className=" text-center absolute  top-1 right-1 rounded-full px-2 bg-opacity-0 hidden group-hover:flex group-hover:flex-row group-hover:gap-4 group-hover:bg-opacity-80 transition-all duration-500"
          >
            <div className="">
              <ToolTip helperText={"Replace Image"}>
                <ReplaceIcon className="text-blue-300 hover:text-blue-500" />
              </ToolTip>
            </div>
            <div className="">
              <ToolTip helperText={"Remove Image"}>
                <Trash2 className="text-red-300 hover:text-red-500" />
              </ToolTip>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeImages;
