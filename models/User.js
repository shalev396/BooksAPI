import mongoose from "mongoose";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const userSchema = new mongoose.Schema({
  fName: { type: String, required: true },
  lName: { type: String, required: true },
  phoneNumber: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

// Hash the password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(
    this.password + "" + process.env.SECRET_KEY,
    10
  );
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(
    password + "" + process.env.SECRET_KEY,
    this.password
  );
};

export default mongoose.model("User", userSchema);
