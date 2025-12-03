import express from "express";
import { allrequest, returnBook, statusUpdate } from "../controllers/requestController.js";
import { protect } from "../middleware/authMiddleware.js";


const requestRouter = express.Router()

requestRouter.get("/all",protect,allrequest)
requestRouter.patch("/updatestatus/:id",protect,statusUpdate)
requestRouter.put("/return/:id",protect,returnBook)

export default requestRouter