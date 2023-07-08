import NoteModel from "./model.js";
import google from "googlethis";

const options = {
  page: 0,
  safe: false, // Safe Search
  parse_ads: true, // If set to true sponsored results will be parsed
  additional_params: {
    // add additional parameters here, see https://moz.com/blog/the-ultimate-guide-to-the-google-search-parameters and https://www.seoquake.com/blog/google-search-param/
    hl: "en",
  },
};

export const getNotes = async (req, res) => {
  try {
    const products = await NoteModel.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSearchDict = async (req, res) => {
  try {
    const data = "define " + req.params.text;
    const response = await google.search(data, options);
    res.status(200).json(`${JSON.stringify(response)}`);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const created = await NoteModel.create({
      id: body.id,
      text: body.text,
      color: body.color,
      time: body.time,
    });
    res.status(200).json({ message: "Created successfully", id: created._id });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const noteData = await NoteModel.findOne({
      id: req.params.id,
    });
    const deleted = await NoteModel.deleteOne({
      id: req.params.id,
    });
    res.status(200).json({ deleted, noteData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
