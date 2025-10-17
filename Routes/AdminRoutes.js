import express from "express";
import Admin from "../models/Admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

// Seed one admin (run once)
router.post("/seed", async (req, res) => {
  const exists = await Admin.findOne({ username: "admin" });
  if (exists) return res.json({ msg: "Admin already exists" });

  const admin = new Admin({ username: "admin", password: "admin123" });
  await admin.save();
  res.json({ msg: "Admin created", admin });
});

// Admin Login
router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const admin = await Admin.findOne({ username });
  if (!admin) return res.status(400).json({ msg: "Invalid username" });

  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

  // Generate token
  const token = jwt.sign({ id: admin._id, role: "admin" }, "secretKey", { expiresIn: "1h" });
  res.json({ msg: "Login successful", token });
});

export default router;
