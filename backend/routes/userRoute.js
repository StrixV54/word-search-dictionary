import express from "express";
import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/userController.js";

const router = express.Router();
import middleware from "../middleware/authMiddleware.js";

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", middleware, getMe);

export default router;
