// // // import jwt from "jsonwebtoken";
// // // import LOGIN from "../models/login.js";

// // // export const protect = async (req, res, next) => {
// // //   try {
// // //     let token;

// // //     // Check token in Authorization header
// // //     if (
// // //       req.headers.authorization &&
// // //       req.headers.authorization.startsWith("Bearer")
// // //     ) {
// // //       token = req.headers.authorization.split(" ")[1]; // Get token part
// // //     }

// // //     if (!token) {
// // //       return res.status(401).json({ message: "Not authorized, no token" });
// // //     }

// // //     // Verify token
// // //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// // //     // Load logged-in user info
// // //     req.user = await LOGIN.findById(decoded.id).select("-password");

// // //     if (!req.user) {
// // //       return res.status(401).json({ message: "User not found" });
// // //     }

// // //     next(); // Continue to controller

// // //   } catch (error) {
// // //     return res.status(401).json({ message: "Invalid or expired token" });
// // //   }
// // // };




// // export const protect = async (req, res, next) => {
// //   console.log(req);
  
// //   try {
// //     let token;

// //     if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
// //       token = req.headers.authorization.split(" ")[1];
// //     }

// //     if (!token) {
// //       return res.status(401).json({ message: "Not authorized, no token" });
// //     }

// //     // Decode token
// //     const decoded = jwt.verify(token, process.env.JWT_SECRET);

// //     // 1️⃣ Get student data
// //     const student = await STUDENT.findById(decoded.id);
// //     if (!student) {
// //       return res.status(401).json({ message: "Student not found" });
// //     }

// //     // 2️⃣ Get login info from LOGIN table using username
// //     const login = await LOGIN.findOne({ username: student.email }).select("-password");

// //     if (!login) {
// //       return res.status(401).json({ message: "Login record not found" });
// //     }

// //     // 3️⃣ Set req.user
// //     req.user = {
// //       id: student._id,
// //       name: student.name,
// //       email: student.email,
// //       role: login.role,
// //     };

// //     next();
// //   } catch (error) {
// //     console.log(error);
// //     return res.status(401).json({ message: "Invalid or expired token" });
// //   }
// // };


// export const protect = async (req, res, next) => {
//   try {
//     let token;

//     if (req.headers.authorization?.startsWith("Bearer")) {
//       token = req.headers.authorization.split(" ")[1];
//     }

//     if (!token) {
//       return res.status(401).json({ message: "No token, authorization denied" });
//     }

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // 1️⃣ Find login user using token ID
//     const loginUser = await LOGIN.findById(decoded.id).select("-password");
//     console.log(loginUser);
    
//     if (!loginUser) return res.status(401).json({ message: "Login user not found" });

//     // 2️⃣ Find student data using email
//     const student = await STUDENT.findOne({ email: loginUser.username });

//     if (!student) return res.status(401).json({ message: "Student record not found" });

//     // 3️⃣ Attach to req.user
//     req.user = {
//       id: student._id,
//       name: student.name,
//       email: student.email,
//       role: loginUser.role
//     };

//     next();

//   } catch (error) {
//     console.log(error);
//     return res.status(401).json({ message: "Invalid or expired token" });
//   }
// };

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
