
import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  farmerId: { type: String, required: true },
  item: { type: String, required: true },
  image: { type: String, required: true },
  quantity: { type: Number, required: true },
  price: { type: Number, required: true },
  quality: { type: String, required: true },
}, { timestamps: true });

export default mongoose.model("Product", productSchema);
