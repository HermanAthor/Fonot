import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";
import Notes from "@/app/models/notes"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req){
            //don't know if i should extract the userId from the request.???
  const {newNoteTitle, newNote, category, userId} = await req.json()
  
  try {
      // const { userId } = req.session; // getting user Session from the request session __posted from the front-end
      // const userId = "user_2UcCfLTdGCXcDa5lmUFiTQAwk8x";
      await mongodb()
      const createdNote = await newNotes.create({
        userId,                     // Creating the document using the userId from the req.session 
        newNoteTitle,
        newNote,
        category
      });

      console.log('New note has been created!');
      console.log(createdNote);

      return NextResponse.json({
          results: ['Data sent succefully'],
          success: true,
      })
      
  } catch (error) {
    
    if(error instanceof mongoose.Error.ValidationError){
      let errorList = []
      for (let e in error.errors){
        errorList.push(error.errors[e].message)
      }
      
      console.log(errorList)
      return NextResponse.json({results: errorList})
    }else{
      return NextResponse.json({results: ['Unable to Create A Note']})
    }
    console.log(error)
       
  }
    
}
// console.error("An error occurred:", error);
//     return NextResponse.json({
//       results: ['An error occurred while processing your request'],
//       success: false,
//     })  