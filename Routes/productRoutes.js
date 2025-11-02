import express from "express";
import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const router = express.Router();

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);
const dbName = "farmersDB"; // same as your signup DB name
const collectionName = "products";

router.post("/add", async (req, res) => {
  try {
    const { product, image, quantity, price, quality } = req.body;

    // ✅ Validate fields
    if (!product || !image || !quantity || !price || !quality) {
      return res.status(400).json({ message: "All fields are required." });
    }

    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const newProduct = {
      product,
      image,
      quantity: parseInt(quantity),
      price: parseFloat(price),
      quality,
      createdAt: new Date()
    };

    await collection.insertOne(newProduct);

    res.status(201).json({ message: "Product added successfully!" });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
});

export default router;
