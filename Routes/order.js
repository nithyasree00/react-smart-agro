import express from "express";
import Notification from "../models/Notification.js";
import Inventory from "../models/Inventory.js";

const router = express.Router();

// Customer places order
router.post("/", async (req, res) => {
  try {
    const { customerId, itemId, address } = req.body;
    const product = await Inventory.findById(itemId);

    if (!product) return res.status(404).json({ message: "Product not found" });

    // Notify farmer
    await Notification.create({
      userId: product.farmerId,
      message: `Your product "${product.item}" has been ordered. Deliver to: ${address}`
    });

    res.json({ success: true, message: "Order placed ✅" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

export default router;
