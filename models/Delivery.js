// models/Delivery.js
import mongoose from "mongoose";

const deliverySchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true },
  address: String,
  password: String,
  role: { type: String, default: "delivery" },
});

export default mongoose.model("Delivery", deliverySchema);
