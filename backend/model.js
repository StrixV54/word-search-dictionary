import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema(
  {
    text: String,
    id: Number,
    time: String,
    color: String,
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("Product", ProductSchema);
export default NoteModel;
