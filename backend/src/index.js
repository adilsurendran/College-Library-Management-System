import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from "express";
import router from "./routes/authRoutes.js";
import cors from "cors";
import bookrouter from "./routes/bookRoutes.js";
import studentRouter from "./routes/studentRoutes.js";
import requestRouter from "./routes/requestRoutes.js";
import adminrouter from "./routes/adminRoutes.js";
import cookieParser from "cookie-parser";
import NewBookRouter from "./routes/bookPurchaseRequestRoutes.js";


dotenv.config();

connectDB();

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=> console.log(`Server running on ${PORT}`))


app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use(cookieParser());



app.use("/api", router);
app.use("/api/books", bookrouter);
app.use("/api/student",studentRouter)
app.use("/api/request",requestRouter)
app.use("/api/admin",adminrouter)
app.use("/api/book-request",NewBookRouter)
