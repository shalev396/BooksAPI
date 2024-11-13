import express from "express";
import Review from "../models/Review.js";
import Book from "../models/Book.js";

const router = express.Router();

// Add Review to Book
router.post("/:bookId/reviews", async (req, res) => {
  try {
    const review = new Review({ ...req.body, book: req.params.bookId });
    await review.save();

    // Add review to the book's reviews array
    await Book.findByIdAndUpdate(req.params.bookId, {
      $push: { reviews: review._id },
    });

    res.status(201).json(review);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// List Reviews for a Book
router.get("/:bookId/reviews", async (req, res) => {
  try {
    const reviews = await Review.find({ book: req.params.bookId });
    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a Review by ID
router.delete("/reviews/:id", async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    if (!review) return res.status(404).json({ error: "Review not found" });
    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
