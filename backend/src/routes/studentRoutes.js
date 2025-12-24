import express from "express";
import { AllStats, history, issueRequest, renewRequest, viewStudent } from "../controllers/studentController.js";
import { protect } from "../middleware/authMiddleware.js";


const studentRouter = express.Router()

studentRouter.get("/viewall",protect,viewStudent)
studentRouter.post("/issuebookreq",protect,issueRequest)
studentRouter.get("/history/:id",protect,history)
studentRouter.get("/allstats/:id",protect,AllStats)
studentRouter.patch("/request/renew/:id", renewRequest);


export default studentRouter