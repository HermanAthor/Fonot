import React from "react";
import { UploadButton } from "@uploadthing/react";
function ThumbnailUploader({ files, setFiles, title }) {
  return (
    <>
      {files.length === 0 ? (
        <div>
          <p>{title}</p>
          <div className="flex justify-start items-start">
            <UploadButton
              endpoint="thumbnailUplader"
              onClientUploadComplete={(res) => {
                setFiles(res);
                console.log("Files: ", res);
                //implement a toast here
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          <p>
            Attached files <span>{files.length}</span>
          </p>
          <div className="flex flex-wrap md:grid md:grid-cols-5 gap-3 ">
            {files?.map((file) => (
              <div
                style={{
                  backgroundImage: `url(${file.url})`,
                  backgroundSize: "cover", // This property ensures that the background image covers the entire container
                }}
                className="bg-no-repeat h-36 md:h-60 w-60 rounded-xl relative"
              >
                <div
                  onClick={() =>
                    alert(
                      "Sorry you can't undo this at the moment but we are working on it"
                    )
                  }
                  className=" text-center absolute top-1 right-1 bg-red-300 hover:bg-red-500 cursor-pointer rounded-full px-2"
                >
                  x
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

export default ThumbnailUploader;
