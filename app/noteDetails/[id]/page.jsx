import { getNoteDataDetails } from "@/app/libs/getData";
import AppLayout from "@/components/Layouts/AppLayout";
import NoteDetails from "@/components/NotesDetails";

const NoteIdPage = async ({ params }) => {
  const id = params.id;
  console.log("noteId", id);
  const detailsData = await getNoteDataDetails(id);
  console.log("detailsData: ", detailsData);
  return (
    <AppLayout>
      <div className="mb-20">
        <NoteDetails data={detailsData} />
      </div>
    </AppLayout>
  );
};

export default NoteIdPage;
