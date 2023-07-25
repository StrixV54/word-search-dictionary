import Model from "./model.js";
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
    const { tab } = req.params;
    const tabNote = await Model.findOne({
      tabname: tab,
    });
    const note = await tabNote?.notelist;
    res.status(200).json({ note });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTabs = async (req, res) => {
  try {
    const products = await Model.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getSearchDict = async (req, res) => {
  try {
    const data = "define " + req.params.text;
    const response = await google.search(data, options);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createNote = async (req, res) => {
  try {
    const noteBody = {
      id: req.body.id,
      text: req.body.text,
      color: req.body.color,
      time: req.body.time,
    };
    const { tab } = req.params;
    const findNoteData = await Model.findOne({
      tabname: tab,
    });
    const note = findNoteData.notelist;
    const updateNoteData = await Model.updateOne(
      { tabname: tab },
      {
        $set: {
          notelist: [...note, noteBody],
        },
      }
    );
    console.log(updateNoteData);
    res.status(200).json({
      message: `Created note successfully`,
      tabName: tab,
      added: noteBody,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createTab = async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const created = await Model.create(
      body.notelist.length === 0
        ? {
            id: body.id,
            color: body.color,
            tabname: body.tabname,
            time: body.time,
          }
        : {
            id: body.id,
            tabname: body.tabname,
            color: body.color,
            time: body.time,
            notelist: body.notelist,
          }
    );
    res.status(200).json({
      message: "Created tab successfully",
      ObjectId: created._id,
      TabName: body.tabname,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteNote = async (req, res) => {
  try {
    const { tab } = req.params;
    const noteData = await Model.findOne({
      tabname: tab,
    });
    const newList = noteData.notelist.filter((tab) => tab.id !== req.params.id);
    const deletedNoteData = await Model.updateOne(
      { tabname: tab },
      {
        $set: {
          notelist: newList,
        },
      }
    );
    res.status(200).json({ message: `Note deleted successfully`, deletedNoteData, noteData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const deleteTab = async (req, res) => {
  try {
    const noteData = await Model.findOne({
      tabname: req.params.tab,
    });
    const deleted = await Model.deleteOne({
      tabname: req.params.tab,
    });
    res.status(200).json({ message: `Tab deleted successfully`, deleted, noteData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
