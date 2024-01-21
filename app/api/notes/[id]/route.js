import { mongodbConnect } from "@/app/libs/mongodbConnect";
import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  try {
    const { editNoteTitle, editNote, newCategory } = await request.json();
    await mongodbConnect();
    await newNotes.findByIdAndUpdate(
      id,
      {
        newNoteTitle: editNoteTitle,
        newNote: editNote,
        category: newCategory,
      },
      { new: true }
    );
    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    console.log("Error updating the note", error);
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  console.log(id);
  try {
    await mongodbConnect();
    const note = await newNotes.find({});
    console.log(note);
    return NextResponse.json({ results: note, status: 200 });
  } catch (error) {
    console.log("Error fetching one note", error);
  }
}
