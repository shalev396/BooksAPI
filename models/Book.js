import mongoose from "mongoose";

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: String,
  publishedYear: Number,
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  reviews: [{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],
});

export default mongoose.model("Book", bookSchema);
