import { mongodbConnect } from "@/app/libs/mongodbConnect";
import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  console.log(id);
  try {
    const { newTitle: editNoteTitle, newDescription: editTitle } =
      await request.json();
    await mongodbConnect();
    await newNotes.findByIdAndUpdate(id, { editNoteTitle, editTitle });
    return NextResponse.json({ message: "Note updated" }, { status: 200 });
  } catch (error) {
    console.log("Error updating the note", error);
  }
}

export async function GET(request, { params }) {
  const { id } = params;
  console.log(id);
  await mongodbConnect();
  const note = await newNotes.findOne({ _d: id });
  console.log(note);
  return NextResponse.json({ results: note, status: 200 });
}
