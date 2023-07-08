import express from "express";
import {
  getNotes,
  getSearchDict,
  createNote,
  deleteNote,
} from "./controller.js";

const router = express.Router();

router.get("/getnotes", getNotes);
router.get("/dict/:text", getSearchDict);
router.post("/createnote", createNote);
router.delete("/deletenote/:id", deleteNote);

export default router;
