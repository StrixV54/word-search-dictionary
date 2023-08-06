import mongoose from "mongoose";

const tabSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    tabname: String,
    id: String,
    notelist: Array,
    time: String,
    color: String,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("TabList", tabSchema);
