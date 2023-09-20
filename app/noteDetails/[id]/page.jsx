import { getNoteDataDetails } from "@/app/libs/getData";
import NoteDetails from "@/components/NotesDetails";

const NoteIdPage = async ({ params }) => {
  const id = params.id;
  console.log("noteId", id);
  const detailsData = await getNoteDataDetails(id);
  console.log("detailsData: ", detailsData);
  return (
    <div>
      <NoteDetails data={detailsData} />
    </div>
  );
};

export default NoteIdPage;
