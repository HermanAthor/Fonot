import { mongodbConnect } from "@/app/libs/mongodbConnect";
import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

// //Post route for all the notes
export async function POST(req) {
  const { userId, newNoteTitle, newNote, category } = await req.json();
  try {
    await mongodbConnect();
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
    await mongodbConnect();
    const notes = await newNotes.find({});
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
// Deleting note from the database

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await mongodbConnect();

    await newNotes.findByIdAndDelete(id);
    return NextResponse.json({
      results: ["Note removed from list"],
      success: true,
    });
  } catch (error) {
    console.log("An error occured: ", error);
    return NextResponse.json({
      results: ["An error occured while deleting your note"],
      success: false,
    });
  }
}
