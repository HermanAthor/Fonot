import { Schema, mongoose } from "mongoose";

const fileSchema = new Schema({
  name: { type: String },
  key: { type: String },
  url: { type: String },
  size: { type: Number },
  serveData: { uploadedBy: String },
});

const recipesSchema = new Schema(
  {
    userId: { type: String, required: true },
    recipe: { type: String, required: true },
    recipeTitle: { type: String, required: true },
    recipeDesc: { type: String, required: true },
    isPublic: { type: Boolean, required: true },
    dietOption: { type: String, required: true },
    recipeDuration: { type: Number, require: true },
    files: [fileSchema],
    thumbnail: [fileSchema],
  },
  { timestamps: true }
);
const recipes =
  mongoose.models.Recipes || mongoose.model("Recipes", recipesSchema);
export default recipes;
