import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

export async function DELETE(request) {
  const id = request.nextUrl.searchParams.get("id");
  await mongodb();
  await newNotes.findByIdAndDelete(id);
  return NextResponse.json({ message: "Note Deleted" }, { status: 200 });
}
