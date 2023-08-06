import express from "express";
import {
  getNotes,
  getSearchDict,
  createNote,
  deleteNote,
  getTabs,
  createTab,
  deleteTab,
} from "../controllers/appController.js";
import middleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/getnotes/:tab", middleware, getNotes);
router.get("/gettabs", middleware, getTabs);
router.get("/dict/:text", middleware, getSearchDict);

router.post("/addnote/:tab", middleware, createNote);
router.post("/addtab", middleware, createTab);

router.delete("/deletenote/:tab/:id", middleware, deleteNote);
router.delete("/deletetab/:id", middleware, deleteTab);

export default router;
