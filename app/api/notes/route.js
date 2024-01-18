import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

// //Post route for all the notes
// export async function POST(req) {}
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
