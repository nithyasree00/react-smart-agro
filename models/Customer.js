// models/Customer.js
import mongoose from "mongoose";

const customerSchema = new mongoose.Schema({
  name: String,
  mobile: { type: String, unique: true },
  village: String,
  address: String,
  password: String,
  role: { type: String, default: "customer" },
});

export default mongoose.model("Customer", customerSchema);
