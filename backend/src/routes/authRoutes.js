import express from "express";
import { upload } from "../middleware/upload.js";
import { loginStudent, registerStudent } from "../controllers/authController.js";
import { generateAccessToken } from "../../utils/generateTokens.js";
import jwt from "jsonwebtoken";


const router = express.Router();

router.post("/register", upload.single("photo"), registerStudent);
router.post("/login", loginStudent);

router.get("/refresh-token", (req, res) => {
  console.log("Cookies received:", req.cookies);
  const token = req.cookies.refreshToken;

  if (!token) return res.status(401).json({ message: "No refresh token" });

  jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ message: "Invalid refresh token" });

    const newAccessToken = generateAccessToken(decoded.id);
    return res.json({ accessToken: newAccessToken });
  });
});

export default router;
