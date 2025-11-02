import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  mobile: { type: String, required: true },
  village: { type: String },
  address: { type: String },
  category: { type: String }, // For farmer: Farming / Milk / Both
  role: { type: String, enum: ["admin", "farmer", "customer", "delivery"], required: true },
  password: { type: String, required: true },
  rating: { type: Number, default: 0 }, // average rating for farmer
}, { timestamps: true });

export default mongoose.model("User", userSchema);
