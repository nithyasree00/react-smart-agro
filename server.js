import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import authRoutes from "./Routes/auth.js";
import inventoryRoutes from "./Routes/inventory.js";
import adminRoutes from "./Routes/admin.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB connected!"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/inventory", inventoryRoutes);

// ---------- 🧠 ADD THIS PART BELOW ----------

// Serve frontend build files in production
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

if (process.env.NODE_ENV === "production") {
  // Adjust if your React build is inside 'frontend/build'
  app.use(express.static(path.join(__dirname, "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => res.send("Smart Agro Backend Running!"));
}

// ---------- 🧠 END ADDITION ----------

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
