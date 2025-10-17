import express from "express";
import Inventory from "../models/Inventory.js";

const router = express.Router();

// 1. Get all pending requests
router.get("/pending", async (req, res) => {
  try {
    const pending = await Inventory.find({ status: "pending" });
    res.json(pending);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Accept request (move to approved)
// Accept request
router.post("/accept/:id", async (req, res) => {
  const { farmerId, farmerName, item, quantity, price } = req.body;
  const requestId = req.params.id;

  try {
    // Update status in DB
    const request = await PendingRequest.findByIdAndUpdate(requestId, { status: "Accepted" });

    // Add product to customer dashboard / inventory
    const product = new Product({
      farmerId,
      farmerName,
      item,
      quantity,
      price,
    });
    await product.save();

    res.status(200).json({ message: "Request accepted successfully", product });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Something went wrong" });
  }
});


// 3. Reject request (remove from DB or mark rejected)
router.post("/reject/:id", async (req, res) => {
  try {
    // Option A: delete
    await Inventory.findByIdAndDelete(req.params.id);

    // Option B (safer): mark rejected
    // const updated = await Inventory.findByIdAndUpdate(req.params.id, { status: "rejected" });

    res.json({ message: "Request rejected" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Get approved (for customers)
router.get("/approved", async (req, res) => {
  try {
    const approved = await Inventory.find({ status: "approved" });
    res.json(approved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
