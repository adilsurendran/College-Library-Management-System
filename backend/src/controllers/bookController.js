import BOOK from "../models/book.js";

export const addBook = async (req, res) => {
  try {
    const { title, author, category, totalCopies, availableCopies } = req.body;

    // Check if ISBN already exists
    const exists = await BOOK.findOne({ title });
    if (exists) {
      return res.status(400).json({ message: "Book  already exists" });
    }

    const book = await BOOK.create({
      title,
      author,
      category,
      totalCopies,
      availableCopies,
    });

    res.status(201).json({ message: "Book added successfully", book });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getBooks = async (req, res) => {
  try {
    const books = await BOOK.find().sort({ createdAt: -1 });
    res.json(books);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const updateBook = async (req, res) => {
  try {
    const updated = await BOOK.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.json({ message: "Book updated", book: updated });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const deleteBook = async (req, res) => {
  try {
    await BOOK.findByIdAndDelete(req.params.id);
    res.json({ message: "Book deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
