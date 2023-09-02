

import { mongodb } from "@/app/libs/mongodb";
import Notes from "@/app/models/notes";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req, res) {
  const user = await currentUser()

  if (!user) {
    return res.status(400).json({ error: 'Missing userId.' });
  }
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