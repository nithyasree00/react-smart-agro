import express from "express";
import { verifyToken } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public route (no login needed)
router.get("/", (req, res) => {
  res.send("Inventory route working!");
});

// Protected route
router.get("/my-cart", verifyToken, (req, res) => {
  res.json({ success: true, message: `Welcome user ${req.user.id}, you are authorized!` });
});

export default router;
