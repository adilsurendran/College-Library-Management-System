
import jwt from "jsonwebtoken";
import STUDENT from "../models/student.js";
import LOGIN from "../models/login.js";


export const protect = async (req, res, next) => {
  try {
    let token;

    if (req.headers.authorization?.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({ message: "No token, authorization denied" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 1️⃣ Find login user
    const loginUser = await LOGIN.findById(decoded.id).select("-password");
    if (!loginUser) {
      return res.status(401).json({ message: "Login user not found" });
    }

    // ----------------------------
    // ✔ ADMIN: bypass student check
    // ----------------------------
    if (loginUser.role === "admin") {
      req.user = {
        id: loginUser._id,
        name: "Admin",
        email: loginUser.username,
        role: "admin"
      };
      return next();
    }

    // ----------------------------
    // ✔ STUDENT: find student record
    // ----------------------------
    const student = await STUDENT.findOne({ email: loginUser.username });

    if (!student) {
      return res.status(401).json({ message: "Student record not found" });
    }

    req.user = {
      id: student._id,
      name: student.name,
      email: student.email,
      role: loginUser.role
    };

    next();

  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};
