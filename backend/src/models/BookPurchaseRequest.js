import mongoose from "mongoose";

const bookPurchaseRequestSchema = new mongoose.Schema(
  {
    student_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student",
      required: true
    },

    title: {
      type: String,
      required: true,
      trim: true
    },

    author: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      required: true,
      trim: true
    },

    status: {
      type: String,
      default: "pending"
    },

    requestDate: {
      type: Date,
      default: Date.now
    }
  },
  { timestamps: true }
);

const BookPurchaseRequest = mongoose.model(
  "BookPurchaseRequest",
  bookPurchaseRequestSchema
);

export default BookPurchaseRequest;
