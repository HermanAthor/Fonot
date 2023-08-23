import { Schema, mongoose } from "mongoose"

const notesSchema = new Schema({
    newNoteTitle: {
        type: String,
        required:[true, 'Title required'],
        trim: true,
        minLength:[4, 'need more than 4 characters for the title'],
        maxLength:[45]
    },
    newNote:{
        type: String,
        required:[true, 'Note required'],
        trim: true,
        minLength:[4, 'need more than 4 characters for the Note'],
        maxLength:[4000]
    },
    category:{
        type: String,
        required:[true, 'Note required'], 
    },
    date:{
        type: Date,
        defautDate: Date.now
    }
})

const Notes = mongoose.models.Notes || mongoose.model('Notes', notesSchema)
export default Notes