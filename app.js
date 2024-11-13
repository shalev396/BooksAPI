import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import morgan from "morgan";

import userRoutes from "./routes/userRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(morgan("tiny"));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((error) => console.error("MongoDB connection error:", error));

// Serve static files from the "public" or "frontend" directory
app.use(express.static("public")); // or replace 'public' with your frontend directory name

app.get("*", (req, res) => {
  res.sendFile("index.html", { root: "public" }); // Update the path if your `index.html` is elsewhere
});

// Route setup
app.use("/api/users", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/reviews", reviewRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
