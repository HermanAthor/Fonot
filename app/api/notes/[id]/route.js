import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: editNoteTitle, newDescription: editTitle } =
    await request.json();
  await mongodb();
  await newNotes.findByIdAndUpdate(id, { editNoteTitle, editTitle });
  return NextResponse.json({ message: "Note updated" }, { status: 200 });
}

export async function GET(request, { params }) {
  const { id } = params;
  console.log(id);
  await mongodb();
  const note = await newNotes.findOne({ _d: id });
  console.log(note);
  return NextResponse.json({ results: note, status: 200 });
}
