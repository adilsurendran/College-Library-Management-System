
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import STUDENT from "../models/student.js";
import LOGIN from "../models/login.js";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

// REGISTER STUDENT
export const registerStudent = async (req, res) => {
  try {
    const { name, email, password, department, regDate } = req.body;

    // 1. Check if email already exists
    const existing = await STUDENT.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    // 2. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3. Create login document
    const loginDoc = await LOGIN.create({
      username:email,
      password: hashedPassword,
      role: "student",
    });

    // 4. File upload (photo)
    const photo = req.file ? req.file.filename : null;

    // 5. Create student record
    const student = await STUDENT.create({
      name,
      email,
      password: hashedPassword,
      department,
      regDate,
      photo,
      loginID: loginDoc._id,
    });

    // 6. Generate token for login
    const token = generateToken(loginDoc._id);

    res.status(201).json({
      message: "Student registered successfully",
      token,
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        department: student.department,
        regDate: student.regDate,
        photo: student.photo,
      }
    });

  } catch (error) {
    console.error("REGISTER ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};


// const generateToken = (id) => {
//   return jwt.sign({ id }, process.env.JWT_SECRET, {
//     expiresIn: process.env.JWT_EXPIRE
//   });3
// };

// LOGIN STUDENT
// export const loginStudent = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // 1. Check if login exists
//     const loginDoc = await LOGIN.findOne({ username:email });
//     if (!loginDoc) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // 2. Verify password
//     const isMatch = await bcrypt.compare(password, loginDoc.password);
//     if (!isMatch) {
//       return res.status(400).json({ message: "Invalid email or password" });
//     }

//     // 3. Fetch student profile
//     const student = await STUDENT.findOne({ email });
//     if (!student) {
//       return res.status(400).json({ message: "Student record not found" });
//     }

//     // 4. Return token + student data
//     res.json({
//       message: "Login successful",
//       token: generateToken(student._id),
//       student: {
//         id: student._id,
//         name: student.name,
//         email: student.email,
//         department: student.department,
//           role: loginDoc.role,
//         photo: student.photo
//       }
//     });

//   } catch (error) {
//     console.error("LOGIN ERROR:", error);
//     res.status(500).json({ message: error.message });
//   }
// };

export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check login exists
    const loginDoc = await LOGIN.findOne({ username: email });
    if (!loginDoc) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // 2. Check password
    const isMatch = await bcrypt.compare(password, loginDoc.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // -------------------------
    // ROLE-BASED HANDLING HERE
    // -------------------------

    // If admin login → no need to find student
    if (loginDoc.role === "admin") {
      return res.json({
        message: "Admin login successful",
        token: generateToken(loginDoc._id),
        student: {
          id: loginDoc._id,
          name: "Admin",
          email: loginDoc.username,
          role: "admin",
        }
      });
    }

    // 3. Otherwise fetch student profile
    const student = await STUDENT.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Student record not found" });
    }

    // 4. Send response
    res.json({
      message: "Login successful",
      token: generateToken(loginDoc._id),
      student: {
        id: student._id,
        name: student.name,
        email: student.email,
        department: student.department,
        role: loginDoc.role,
        photo: student.photo
      }
    });

  } catch (error) {
    console.error("LOGIN ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};
