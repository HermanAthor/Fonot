import { mongodbConnect } from "@/app/libs/mongodbConnect";
import recipes from "@/app/models/recipes";
import { NextResponse } from "next/server";

//Post recipes for all the recipes
export async function POST(req) {
  const {
    userId,
    files,
    thumbnail,
    isPublic,
    dietOption,
    recipe,
    recipeTitle,
    recipeDesc,
    recipeDuration,
  } = await req.json();
  // const {
  //   userId,
  //   files,
  //   thumbnail,
  //   isPublic,
  //   dietOption,
  //   recipe,
  //   recipeTitle,
  //   recipeDesc,
  //   recipeDuration,
  // } = formData;
  // console.log(formData);
  try {
    await mongodbConnect();
    const recipeList = new recipes({
      userId,
      files,
      thumbnail,
      isPublic,
      dietOption,
      recipe,
      recipeTitle,
      recipeDesc,
      recipeDuration,
    });

    await recipeList.save();
    console.log("Recipe has been saved");
    return NextResponse.json({
      results: ["Recipe has been added to your list"],
      success: true,
    });
  } catch (error) {
    return NextResponse.json({
      results: ["Error occured while saving your recipe"],
      success: false,
    });
  }
}
// //GET route to get the notes from mongodb
export async function GET() {
  try {
    await mongodbConnect();
    const results = await recipes.find({});
    return NextResponse.json({
      results: results,
      success: true,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      results: ["An error occurred while fetching recipe"],
      success: false,
    });
  }
}
// Deleting note from the database

export async function DELETE(req) {
  const id = req.nextUrl.searchParams.get("id");
  try {
    await mongodbConnect();

    await recipes.findByIdAndDelete(id);
    return NextResponse.json({
      results: ["Recipe removed from list"],
      success: true,
    });
  } catch (error) {
    console.log("An error occured: ", error);
    return NextResponse.json({
      results: ["An error occured while deleting your recipe"],
      success: false,
    });
  }
}
