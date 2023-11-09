import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";
import { useUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default async function GET(req, res) {
  const user = await useUser();

  if (!user) {
    return res.status(400).json({ error: "Missing user" });
  }
  try {
    const {
      query: { noteId },
    } = req;

    await mongodb(); // Connect to the database
    const note = await newNotes.findOne(noteId); // Find the note by ID
    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    return NextResponse.json({
      results: note,
      success: true,
    });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}

// export async function GET(request, { params }) {
//   const { id } = params;
//   await mongodb();
//   const note = await newNotes.findOne({ _id: id });
//   return NextResponse.json({ note }, { status: 200 });
// }
