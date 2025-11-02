import express from "express";
import jwt from "jsonwebtoken";
import Order from "../models/Order.js";

const router = express.Router();

// Place order
router.post("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { items } = req.body;

    const newOrder = await Order.create({
      customerId: decoded.id,
      items,
    });

    res.json({ success: true, message: "Order placed", order: newOrder });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// Fetch my orders
router.get("/", async (req, res) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const orders = await Order.find({ customerId: decoded.id });
    res.json(orders);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
