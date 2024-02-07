import { Schema, mongoose } from "mongoose";

const commentsSchema = new Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    recipeId: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: [true, "Note required"],
      trim: true,
      minLength: [2, "need more than 4 characters for the Note"],
      maxLength: [500, "No one has time to read a novel"],
    },
  },
  { timestamps: true }
);

const Comments =
  mongoose.models.Comments || mongoose.model("Comments", commentsSchema);
export default Comments;
