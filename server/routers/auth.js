import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Joi from "joi";
import User from "../models/users.js";
import { authenticateUser } from "../middleware/auth.js";

const router = express.Router();

// Register a new user
router.post("/register", async (req, res) => {
  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
    userName: Joi.string().min(5).max(20).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    const newUser = new User({
      email: req.body.email,
      password: hashedPassword,
      userName: req.body.userName,
    });

    const savedUser = await newUser.save();

    const token = jwt.sign(
      { user: { id: savedUser._id } },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    });

    res.status(201).json({
      message: "Registration successful", // Ensure message is included in the response
      token,
      user: {
        id: savedUser._id,
        email: savedUser.email,
        userName: savedUser.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User login
router.post("/login", async (req, res) => {
  // Validate input
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(400).json({ message: error.details[0].message });
  }

  // Check if user exists
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Validate password
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ user: { id: user._id } }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Enable in production with HTTPS
    });

    // Respond with token and user data
    res.status(200).json({
      token,
      user: {
        id: user._id,
        email: user.email,
        userName: user.userName,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// User logout (clear token)
router.post("/logout", (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
});

// Route to change user password
router.put("/change-password", authenticateUser, async (req, res) => {
  const { currentPassword, newPassword } = req.body;

  console.log("Change Password Request:", { currentPassword, newPassword });

  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    user.password = hashedPassword;
    await user.save();

    console.log("Password updated successfully for user:", user._id);
    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Error in change-password route:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
