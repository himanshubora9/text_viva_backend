import express from "express";
import jwt from "jsonwebtoken";
import { generateStreamToken } from "../services/stream.service.js";

const router = express.Router();

// Mock login
router.post("/login", (req, res) => {
  const { empId, role } = req.body;

  if (!empId) {
    return res.status(400).json({ error: "empId required" });
  }

  const token = jwt.sign({ empId, role }, process.env.JWT_SECRET, {
    expiresIn: "1d",
  });

  return res.json({
    success: true,
    user: { empId, role },
    accessToken: token,
  });
});

// Generate Stream Token
router.get("/stream/token/:userId", (req, res) => {
  const { userId } = req.params;

  const streamToken = generateStreamToken(userId);

  res.json({
    userId,
    streamToken,
  });
});

export default router;
