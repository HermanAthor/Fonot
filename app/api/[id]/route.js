import { mongodb } from "@/app/libs/mongodb";
import newNotes from "@/app/models/newNoteModel";

export async function PUT(request, { params }) {
  const { id } = params;
  const { newTitle: newNoteTitle, newDescription: newNote } =
    await request.json();
  await mongodb();
  await newNotes.findByIdAndUpdate(id, { newNoteTitle, newNote });
  return NextResponse.json({ message: "Note Updated" }, { status: 200 });
}
