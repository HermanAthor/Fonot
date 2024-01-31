"use client";
import React, { useState } from "react";
import { UploadButton } from "@uploadthing/react";
function ImageUploader({ files, setFiles, title }) {
  const [isLoading, setLoading] = useState(false);

  const deleteUploadedImage = (key) => {
    const filteredFiles = files.filter((item) => item.key !== key);
    setFiles(filteredFiles);
  };
  return (
    <>
      {files.length === 0 ? (
        <div>
          <p>{title}</p>
          <div className="flex justify-start items-start">
            <UploadButton
              endpoint="imageUploader"
              onClientUploadComplete={(res) => {
                setFiles(res);
                setLoading(true);
                console.log("Files: ", res);
                //implement a toast here
              }}
              onUploadError={(error) => {
                // Do something with the error.
                alert(`ERROR! ${error.message}`);
                setLoading(false);
              }}
            />
          </div>
        </div>
      ) : (
        <div>
          {isLoading && (
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
                      onClick={() => deleteUploadedImage(file.key)}
                      className=" text-center absolute top-1 right-1 bg-red-300 hover:bg-red-500 cursor-pointer rounded-full px-2"
                    >
                      x
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default ImageUploader;
