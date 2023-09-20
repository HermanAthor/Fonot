import React from "react";
import { SignUp } from "@clerk/nextjs";

function SignUpPage() {
  return (
    <div className="bg-white dark:bg-gray-900  bg-[url('/images/notes-photo.jpg')] bg-no-repeat bg-cover h-full w-full">
      <div className="w-full h-full flex  justify-center items-center backdrop-blur-sm">
        <div className="flex justify-center items-center h-screen">
          <SignUp />
        </div>
      </div>
    </div>
  );
}

export default SignUpPage;
