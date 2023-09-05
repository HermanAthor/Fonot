import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";
import Notes from "@/app/models/notes"
import mongoose from "mongoose"
import { NextResponse } from "next/server"

export async function POST(req){
  try {
    const userId = "user_2UcCfLTdGCXcDa5lmUFiTQAwk8x"; // I used this as a temp userId, you may consider changing it
    await mongodb();

    const requestData = await req.json();

    const { newNoteTitle, newNote, category } = requestData;

    const createdNote = new newNotes({
      userId,
      newNoteTitle,
      newNote,
      category,
    });
  
    await createdNote.save();

    console.log('New note has been created!');
    console.log(createdNote);

    return NextResponse.json({
      results: ['Data sent successfully'],
      success: true,
    });
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      let errorList = [];
      for (let e in error.errors) {
        errorList.push(error.errors[e].message);
      }
      console.log(errorList);
      return NextResponse.json({ results: errorList });
    } else {
      return NextResponse.json({ results: ['Unable to Create A Note'] });
    }
  }
}
