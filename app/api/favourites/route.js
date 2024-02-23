import { mongodbConnect } from "@/app/libs/mongodbConnect";
import Favourites from "@/app/models/favouritesSchema";
import { NextResponse } from "next/server";

// //Post route for all the notes
export async function POST(req) {
  const {
    favouriteRecipeId,
    userId,
    posterUserId,
    isPublic,
    recipe,
    recipeTitle,
    recipeDesc,
    dietOption,
    recipeDuration,
    files,
    thumbnail,
  } = await req.json();
  try {
    await mongodbConnect();
    const favouriteList = new Favourites({
      posterUserId,
      favouriteRecipeId,
      userId,
      isPublic,
      recipe,
      recipeTitle,
      recipeDesc,
      dietOption,
      recipeDuration,
      files,
      thumbnail,
    });

    await favouriteList.save();
    console.log("recipe has been added to favourites");
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
    let data = await Favourites.find({}).sort({ createdAt: -1 });
    changeStream = Favourites.watch([], { fullDocument: "updateLookup" });
    changeStream.on("change", async (change) => {
      if (change.operationType === "insert") {
        data = await Favourites.find({}).sort({ createdAt: -1 });
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

    await Favourites.findByIdAndDelete(id);
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
