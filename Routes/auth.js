import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Farmer from "../models/Farmer.js";
import Customer from "../models/Customer.js";
import Admin from "../models/Admin.js";
import Delivery from "../models/Delivery.js";

const router = express.Router();

// Helper function: get model by role
const getModelByRole = (role) => {
  switch (role) {
    case "farmer":
      return Farmer;
    case "customer":
      return Customer;
    case "admin":
      return Admin;
    case "delivery":
      return Delivery;
    default:
      return null;
  }
};

// 📝 SIGNUP
router.post("/signup", async (req, res) => {
  const { name, mobile, password, village, address, category, role } = req.body;

  try {
    const Model = getModelByRole(role);
    if (!Model) return res.status(400).json({ success: false, message: "Invalid role" });

    const existingUser = await Model.findOne({ mobile });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists with this mobile" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Model({
      name,
      mobile,
      village,
      address,
      category,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Signup successful", token, role: newUser.role });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ success: false, message: "Server error during signup" });
  }
});

// 🔐 LOGIN
router.post("/login", async (req, res) => {
  const { mobile, password, role } = req.body;

  try {
    const Model = getModelByRole(role);
    if (!Model) return res.status(400).json({ success: false, message: "Invalid role" });

    const user = await Model.findOne({ mobile });
    if (!user) return res.status(400).json({ success: false, message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.json({ success: true, message: "Login successful", token, role: user.role });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ success: false, message: "Server error during login" });
  }
});

export default router;
