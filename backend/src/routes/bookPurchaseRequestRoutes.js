import express from "express";
import { createBookRequest, getAllBookRequests, getStudentBookRequests, updateBookRequestStatus } from "../controllers/bookPurchaseRequestController.js";


const NewBookRouter = express.Router();

// STUDENT
NewBookRouter.post("/create", createBookRequest);
NewBookRouter.get("/student/:studentId", getStudentBookRequests);

// ADMIN
NewBookRouter.get("/all", getAllBookRequests);
NewBookRouter.patch("/status/:id", updateBookRequestStatus);

export default NewBookRouter;
