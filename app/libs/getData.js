import { currentUser } from "@clerk/nextjs";

 export const getNoteData = async () => {
    const res = await fetch("http://localhost:3000/api/getNote");

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return res.json();
  };
// const noteId = '64e4dfc794b60091f403330a'
 export const getNoteDataDetails = async (noteId) => {
  const user = await currentUser()
    if(!user){
      return res.status(400).json({ error: 'Missing userId.' })
    }
    try {
      const res = await fetch(`http://localhost:3000/api/getNote/${noteId}`);

      return res.json();
    } catch (error) {
      console.log("Error fetching data", error)
      
    }
  };

