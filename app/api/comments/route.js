import { mongodbConnect } from "@/app/libs/mongodbConnect";
import Comments from "@/app/models/commentsSchema";
//import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

// //Post route for all the notes
export async function POST(req) {
  const { userId, recipeId, comment } = await req.json();
  try {
    await mongodbConnect();
    const commentsList = new Comments({
      userId,
      recipeId,
      comment,
    });

    await commentsList.save();
    console.log("comment has been saved");
    return NextResponse.json({
      results: ["Comment has been added to your list"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      results: ["Error occured while saving your comment"],
      success: false,
    });
  }
}
// //GET route to get the notes from mongodb
// export async function GET() {
//   try {
//     await mongodbConnect();

//     const data = await Comments.find({}).sort({ createdAt: -1 });
//     return NextResponse.json({
//       results: data,
//       success: true,
//     });
//   } catch (error) {
//     console.error("An error occurred:", error);
//     return NextResponse.json({
//       results: ["An error occurred while fetching comments"],
//       success: false,
//     });
//   }
// }

let changeStream;

export async function GET() {
  try {
    await mongodbConnect();
    let data = await Comments.find({}).sort({ createdAt: -1 });
    changeStream = Comments.watch([], { fullDocument: "updateLookup" });
    changeStream.on("change", async (change) => {
      if (change.operationType === "insert") {
        data = await Comments.find({}).sort({ createdAt: -1 });
      }
    });

    return NextResponse.json({
      results: data,
      success: true,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      results: ["An error occurred while fetching comments"],
      success: false,
    });
  }
}

// Don't forget to close the change stream when it's no longer needed
// function stopChangeStream() {
//   if (changeStream) {
//     changeStream.close();
//     changeStream = null;
//   }
// }
// stopChangeStream();

// Deleting note from the database

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await mongodbConnect();

    await newNotes.findByIdAndDelete(id);
    return NextResponse.json({
      results: ["Note removed from list"],
      success: true,
    });
  } catch (error) {
    console.log("An error occured: ", error);
    return NextResponse.json({
      results: ["An error occured while deleting your note"],
      success: false,
    });
  }
}
