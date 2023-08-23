import Notes from "@/app/models/notes"
import { mongodb } from "@/libs/mongodb"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req){
  
  const {newNoteTitle,newNote,category,} = await req.json()
  
  try {
      await mongodb()
      await Notes.create({
          newNoteTitle,newNote,category
      })
      
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
    console.log(err)
       
  }
    
}
// console.error("An error occurred:", error);
//     return NextResponse.json({
//       results: ['An error occurred while processing your request'],
//       success: false,
//     })  