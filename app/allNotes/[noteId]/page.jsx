import { getNoteDataDetails } from "@/app/libs/getData";
import NoteDetails from "@/components/NotesDetails";

const NoteIdPage = async ({ params }) => {
  const { noteId } = params;

  const detailsData = await getNoteDataDetails(noteId);
  console.log("detailsData: ", detailsData);
  return (
    <div>
      <NoteDetails />
      <NoteDetails data={detailsData} />
    </div>
  );
};

export default NoteIdPage;
