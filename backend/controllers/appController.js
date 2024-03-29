import expressAsyncHandler from "express-async-handler";
import TabModel from "../models/appModel.js";
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

export const getNotes = expressAsyncHandler(async (req, res) => {
  try {
    const { tab } = req.params;
    const tabNote = await TabModel.findOne({
      tabname: tab,
      user: String(req.user.id),
    });
    // console.log(user);
    const note = await tabNote.notelist;
    res.status(200).json({ note });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getTabs = expressAsyncHandler(async (req, res) => {
  try {
    console.log(req.user.id);
    const products = await TabModel.find({ user: req.user.id });
    res.status(200).json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const getSearchDict = expressAsyncHandler(async (req, res) => {
  try {
    const data = "define " + req.params.text;
    const response = await google.search(data, options);
    res.status(200).json(response);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const createNote = expressAsyncHandler(async (req, res) => {
  try {
    const noteBody = {
      id: req.body.id,
      text: req.body.text,
      color: req.body.color,
      time: req.body.time,
    };
    const { tab } = req.params;
    const user = req.user.id;
    const findNoteData = await TabModel.findOne({
      tabname: tab,
      user: req.user.id,
    });
    const note = findNoteData.notelist;
    const updateNoteData = await TabModel.updateOne(
      { tabname: tab, user: req.user.id },
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
});

export const createTab = expressAsyncHandler(async (req, res) => {
  try {
    const { body } = req;
    console.log(body);
    const created = await TabModel.create(
      body.notelist.length === 0
        ? {
            id: body.id,
            color: body.color,
            tabname: body.tabname,
            time: body.time,
            user: req.user.id,
          }
        : {
            id: body.id,
            tabname: body.tabname,
            color: body.color,
            time: body.time,
            notelist: body.notelist,
            user: req.user.id,
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
});

export const deleteNote = expressAsyncHandler(async (req, res) => {
  try {
    const { tab } = req.params;
    const noteData = await TabModel.findOne({
      tabname: tab,
      user: req.user.id,
    });
    const newList = noteData.notelist.filter((tab) => tab.id !== req.params.id);
    const deletedNoteData = await TabModel.updateOne(
      { tabname: tab, user: req.user.id },
      {
        $set: {
          notelist: newList,
        },
      }
    );
    res.status(200).json({
      message: `Note deleted successfully`,
      deletedNoteData,
      noteData,
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

export const deleteTab = expressAsyncHandler(async (req, res) => {
  try {
    const noteData = await TabModel.findOne({
      id: req.params.id,
      user: req.user.id,
    });
    const deleted = await TabModel.deleteOne({
      id: req.params.id,
      user: req.user.id,
    });
    res
      .status(200)
      .json({ message: `Tab deleted successfully`, deleted, noteData });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// export const loginUser = expressAsyncHandler(async (req, res) => {
//   try {
//     const { username, password } = req.body;
//     res
//       .status(200)
//       .json({ message: `Fetch successfully`, name , noteData });
//   } catch (error) {
//     res.status(404).json({ message: error.message });
//   }
// });
