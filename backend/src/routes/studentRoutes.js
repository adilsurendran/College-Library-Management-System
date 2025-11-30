import express from "express";
import { viewStudent } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";


const studentRouter = express.Router()

studentRouter.get("/viewall",protect,viewStudent)

export default studentRouter