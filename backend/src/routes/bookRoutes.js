import express from "express";
import { addBook, getBooks, updateBook, deleteBook } from "../controllers/bookController.js";
import { protect } from "../middleware/authMiddleware.js";

const bookrouter = express.Router();

// Admin only (optional)
bookrouter.post("/", protect, addBook);

bookrouter.get("/", getBooks);

bookrouter.put("/:id", protect, updateBook);

bookrouter.delete("/:id", protect, deleteBook);

export default bookrouter;
