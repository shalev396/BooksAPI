import express from "express";
import User from "../models/User.js";

const router = express.Router();

// Register User Route
// Register User Route
router.post("/register", async (req, res) => {
  try {
    const { fName, lName, phoneNumber, email, password } = req.body;

    // Create a new user instance
    const user = new User({
      fName,
      lName,
      phoneNumber,
      email,
      password,
    });

    await user.save();
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error during registration:", error.message);

    // Check for validation errors
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({ error: messages.join(", ") });
    }
    if (error.code === 11000) {
      // Duplicate key error for unique fields (e.g., email or phone number)
      const field = Object.keys(error.keyPattern)[0];
      return res.status(400).json({ error: `The ${field} is already taken` });
    }

    res.status(500).json({ error: "An internal server error occurred" });
  }
});
// Login User Route
router.post("/login", async (req, res) => {
  try {
    console.log(req.body);

    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    // Return user ID and a success message
    res.json({ message: "Login successful", userId: user._id });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ error: "An internal server error occurred" });
  }
});

export default router;
