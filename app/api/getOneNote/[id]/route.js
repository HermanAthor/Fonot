

import { mongodb } from '@/app/libs/mongodb';
import newNotes from '@/app/models/newNoteModel';

export default async function handler(req, res) {
  try {
    const { query: { id } } = req;

    await mongodb()                             // Connect to your database
    const note = await newNotes.findById( id ) // Find the book by ID
    if (!note) {
      return res.status(404).json({ message: 'Note not found' });
    }

    return res.status(200).json(note);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}
