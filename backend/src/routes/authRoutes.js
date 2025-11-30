import express from "express";
import { upload } from "../middleware/upload.js";
import { loginStudent, registerStudent } from "../controllers/authController.js";

const router = express.Router();

router.post("/register", upload.single("photo"), registerStudent);
router.post("/login", loginStudent);

export default router;
