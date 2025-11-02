// routes/AdminRoutes.js
import express from "express";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Admin route working fine!");
});

export default router;
