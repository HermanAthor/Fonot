import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

// //Post route for all the notes
export async function POST(req) {
  const { userId, newNoteTitle, newNote, category } = await req.json();
  try {
    await mongodb();
    const notesList = new newNotes({
      userId,
      newNoteTitle,
      newNote,
      category,
    });

    await notesList.save();
    console.log("Note has been saved");
    return NextResponse.json({
      results: ["Note has been added to your list"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      results: ["Error occured while saving your notes"],
      success: false,
    });
  }
}
// //GET route to get the notes from mongodb
export async function GET() {
  try {
    await mongodb();
    const notes = await newNotes.find({});
    console.log(notes);
    return NextResponse.json({
      results: notes,
      success: true,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      results: ["An error occurred while fetching notes"],
      success: false,
    });
  }
}
