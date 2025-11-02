import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Customer from "../models/Customer.js";

const router = express.Router();

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { name, mobile, village, address, password } = req.body;
    const hashed = await bcrypt.hash(password, 10);
    const newCustomer = await Customer.create({
      name,
      mobile,
      village,
      address,
      password: hashed,
    });
    res.json({ success: true, message: "Signup successful", user: newCustomer });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { mobile, password } = req.body;
    const customer = await Customer.findOne({ mobile });
    if (!customer) return res.status(400).json({ success: false, message: "Customer not found" });

    const isMatch = await bcrypt.compare(password, customer.password);
    if (!isMatch) return res.status(400).json({ success: false, message: "Invalid credentials" });

    const token = jwt.sign({ id: customer._id }, process.env.JWT_SECRET);
    res.json({ success: true, token });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// Fetch profile
router.get("/me", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ message: "No token provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const customer = await Customer.findById(decoded.id).select("-password");
    res.json(customer);
  } catch (err) {
    res.status(400).json({ message: "Invalid token" });
  }
});

export default router;
