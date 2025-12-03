import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { allstats } from "../controllers/adminController.js";

const adminrouter = express.Router();

// Admin only (optional)
adminrouter.get("/statsall", protect,allstats);


export default adminrouter;
