import express from "express";
import Product from "../models/Product.js";
import Farmer from "../models/Farmer.js";

const router = express.Router();

// Add new product (farmer)
router.post("/add-product", async (req, res) => {
  try {
    const { farmerId, name, category, price, quantity, quality, description } = req.body;

    const farmer = await Farmer.findById(farmerId);
    if (!farmer) return res.status(404).json({ success: false, message: "Farmer not found" });

    const product = new Product({ farmerId, name, category, price, quantity, quality, description });
    await product.save();

    res.status(201).json({ success: true, message: "Product added successfully", product });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error adding product", error: err.message });
  }
});

// Get all products of this farmer
router.get("/my-products/:farmerId", async (req, res) => {
  try {
    const products = await Product.find({ farmerId: req.params.farmerId });
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching products" });
  }
});

// Get all products (for customers to view)
router.get("/all-products", async (req, res) => {
  try {
    const products = await Product.find().populate("farmerId", "name village");
    res.json({ success: true, products });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching all products" });
  }
});

export default router;
