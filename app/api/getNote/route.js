

import Notes from "@/app/models/notes";
import { mongodb } from "@/libs/mongodb";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  try {
    await mongodb();
    const notes = await Notes.find({})
    return NextResponse.json({
      results: notes,
      success: true,
    });
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.json({
      results: ['An error occurred while fetching notes'],
      success: false,
    });
  }
}