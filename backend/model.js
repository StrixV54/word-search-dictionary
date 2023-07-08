import mongoose from "mongoose";

const NoteSchema = new mongoose.Schema(
  {
    text: String,
    id: Number,
    time: String,
    color: String,
  },
  { timestamps: true }
);

const NoteModel = mongoose.model("TabNote", NoteSchema);
export default NoteModel;
