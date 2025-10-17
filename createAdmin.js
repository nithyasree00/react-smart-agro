import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/admin.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.error("❌ MongoDB Error", err));

const seedAdmin = async () => {
  try {
    const existingAdmin = await Admin.findOne({ mobile: "9999999999" });
    if (existingAdmin) {
      console.log("⚠️ Admin already exists");
      return;
    }

    const hashedPassword = await bcrypt.hash("admin123", 10);

    const admin = new Admin({
      name: "Super Admin",
      mobile: "9999999999",
      password: hashedPassword,
      role: "admin"
    });

    await admin.save();
    console.log("✅ Admin created successfully with mobile=9999999999, password=admin123");
  } catch (error) {
    console.error("DB Error:", error);
  } finally {
    mongoose.disconnect();
  }
};

seedAdmin();
