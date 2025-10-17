import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  farmerId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  item: String,
  quantity: String,
  price: Number,
  status: { type: String, enum: ["pending", "approved", "rejected"], default: "pending" }
});

export default mongoose.model("Inventory", inventorySchema);
