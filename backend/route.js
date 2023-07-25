import express from "express";
import {
  getNotes,
  getSearchDict,
  createNote,
  deleteNote,
  getTabs,
  createTab,
  deleteTab,
} from "./controller.js";

const router = express.Router();

router.get("/getnotes/:tab", getNotes);
router.get("/gettabs", getTabs);
router.get("/dict/:text", getSearchDict);

router.post("/addnote/:tab", createNote);
router.post("/addtab", createTab);

router.delete("/deletenote/:tab/:id", deleteNote);
router.delete("/deletetab/:tab", deleteTab);

export default router;
