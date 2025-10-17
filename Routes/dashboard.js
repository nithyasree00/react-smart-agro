// Routes/dashboard.js
import express from "express";
const router = express.Router();

// Example routes
router.get("/pending", (req, res) => {
  res.json([{ id: 1, farmer: "John", item: "Tomatoes", qty: "5kg", price: 100 }]);
});

router.post("/accept/:id", (req, res) => {
  res.json({ success: true, message: `Request ${req.params.id} accepted` });
});

router.post("/reject/:id", (req, res) => {
  res.json({ success: true, message: `Request ${req.params.id} rejected` });
});

// ✅ Export correctly
export default router;
