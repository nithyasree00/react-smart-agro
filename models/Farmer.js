// models/Farmer.js
import mongoose from "mongoose";

const farmerSchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true },
  village: String,
  address: String,
  category: String,
  password: String,
  role: { type: String, default: "farmer" },
});

export default mongoose.model("Farmer", farmerSchema);
