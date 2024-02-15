import { Schema, mongoose } from "mongoose";

const LikesSchema = new Schema(
  {
    likedRecipeId: {
      type: String,
      required: true,
    },
    likedRecipeUserId: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const Likes = mongoose.models.Likes || mongoose.model("Likes", LikesSchema);
export default Likes;
