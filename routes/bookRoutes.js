import express from "express";
import Book from "../models/Book.js";

const router = express.Router();

// Create Book
router.post("/", async (req, res) => {
  try {
    const { title, author, genre, publishedYear, createdBy } = req.body;

    if (!createdBy) {
      return res
        .status(400)
        .json({ error: "The 'createdBy' field is required" });
    }

    const book = new Book({
      title,
      author,
      genre,
      publishedYear,
      createdBy,
    });
    await book.save();
    res.status(201).json(book);
  } catch (error) {
    console.error("Error adding book:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// List Books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get Book Details by ID
router.get("/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).populate("reviews");
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json(book);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete Book by ID
router.delete("/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id);
    if (!book) return res.status(404).json({ error: "Book not found" });
    res.status(200).json({ message: "Book deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
