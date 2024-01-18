//import { currentUser } from "@clerk/nextjs";

export const getNoteData = async (url) => {
  const res = await fetch(url);

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
};

//import fetch from "node-fetch"; // Add this import if you are running this code in a Node.js environment.

export const getNoteDataDetails = async (noteId) => {
  console.log("NOTEID", noteId);
  try {
    const user = "234";
    if (!user) {
      throw new Error("Missing userId.");
    }

    const response = await fetch(`http://localhost:3000/api/getNote/${noteId}`);

    // if (!response.ok) {
    //   throw new Error("Failed to fetch note data.");
    // }

    return await response.json();
  } catch (error) {
    console.log("Error fetching data", error);
    throw error; // Rethrow the error to handle it in the calling code.
  }
};
