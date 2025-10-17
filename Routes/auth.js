import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Farmer from "../models/Farmer.js";
import Customer from "../models/Customer.js";
import Delivery from "../models/Delivery.js";
import Admin from "../models/Admin.js";

const router = express.Router();

// Map role to the correct model
const roleModelMap = {
  farmer: Farmer,
  customer: Customer,
  delivery: Delivery,
  admin: Admin
};

// ---------------- LOGIN ----------------
router.post("/login", async (req, res) => {
  try {
    const { identifier, password, role } = req.body;

    if (!identifier || !password || !role) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    const Model = roleModelMap[role.toLowerCase()];
    if (!Model) return res.status(400).json({ success: false, message: "Invalid role" });

    // Find user in the correct collection
    const user = await Model.findOne({ mobile: identifier });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ success: false, message: "Invalid password" });

    // Generate JWT token
    const token = jwt.sign({ id: user._id, role: role }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({ success: true, message: "Login successful", token, role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

// ---------------- SIGNUP ----------------
router.post("/signup", async (req, res) => {
  const { role, ...data } = req.body;

  try {
    const Model = roleModelMap[role.toLowerCase()];
    if (!Model) return res.status(400).json({ success: false, message: "Invalid role" });

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const user = new Model({ ...data, password: hashedPassword });

    await user.save();

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ success: true, message: "Signup successful", token });
  } catch (err) {
    console.error("Signup error:", err);
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: "Mobile number already exists" });
    }
    res.status(500).json({ success: false, message: "Signup failed", error: err.message });
  }
});

export default router;
