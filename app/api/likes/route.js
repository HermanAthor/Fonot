import { mongodbConnect } from "@/app/libs/mongodbConnect";
import Likes from "@/app/models/likesSchema";

//import newNotes from "@/app/models/newNoteModel";
import { NextResponse } from "next/server";

// //Post route for all the notes
export async function POST(req) {
  const { likedRecipeId, likedRecipeUserId } = await req.json();
  try {
    await mongodbConnect();
    const likedList = new Likes({
      likedRecipeId,
      likedRecipeUserId,
    });

    await likedList.save();
    console.log("like has been saved");
    return NextResponse.json({
      results: ["like has been added to your list"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      results: ["Error occured while saving your comment"],
      success: false,
    });
  }
}
//GET route to get the notes from mongodb
// export async function GET() {
//   try {
//     await mongodbConnect();

//     const data = await Likes.find({}).sort({ createdAt: -1 });
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
    let data = await Likes.find({}).sort({ createdAt: -1 });
    changeStream = Likes.watch([], { fullDocument: "updateLookup" });
    changeStream.on("change", async (change) => {
      if (change.operationType === "insert") {
        data = await Likes.find({}).sort({ createdAt: -1 });
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

//Don't forget to close the change stream when it's no longer needed
function stopChangeStream() {
  if (changeStream) {
    changeStream.close();
    changeStream = null;
  }
}
stopChangeStream();

// Deleting note from the database

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  console.log(id);
  try {
    await mongodbConnect();

    await Likes.findByIdAndDelete(id);
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
