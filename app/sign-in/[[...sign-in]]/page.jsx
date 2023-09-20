import React from "react";
import { SignIn } from "@clerk/nextjs";

function SignInPage() {
  return (
    <div className="bg-white dark:bg-gray-900  bg-[url('/images/notes-photo.jpg')] bg-no-repeat bg-cover h-full w-full">
      <div className="w-full h-full flex  justify-center items-center backdrop-blur-sm">
        <div className="flex justify-center h-screen items-center">
          <SignIn />
        </div>
      </div>
    </div>
  );
}

export default SignInPage;
