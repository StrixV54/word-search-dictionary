import mongoose from "mongoose";

const TabSchema = new mongoose.Schema(
  {
    tabname: String,
    id: Number,
    notelist: Array,
    time: String,
    color: String,
  },
  { timestamps: true }
);

const TabModel = mongoose.model("TabList", TabSchema);

export default TabModel;
