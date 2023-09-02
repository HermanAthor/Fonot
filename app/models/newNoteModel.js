import { Schema, mongoose } from "mongoose"

const newNotesSchema = new Schema({
    userId:{
        type:String,
        required: true
    },
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
},{timestamps: true})

const newNotes = mongoose.models.Notes || mongoose.model('Notes', newNotesSchema)
export default newNotes