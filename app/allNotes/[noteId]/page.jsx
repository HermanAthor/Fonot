import { getNoteDataDetails } from "@/app/libs/getData";
import NoteDetails from "@/components/NotesDetails";

const NoteIdPage = async ({ params }) => {
  const { noteId } = params;
  return (
    <div className="mb-20">
      <NoteDetails noteId={noteId} />
    </div>
  );
};

export default NoteIdPage;
