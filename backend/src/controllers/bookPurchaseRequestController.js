import BookPurchaseRequest from "../models/BookPurchaseRequest.js";

/* -------------------------------------------------
   STUDENT: Create new book purchase request
-------------------------------------------------- */
export const createBookRequest = async (req, res) => {
  const { student_id, title, author, category } = req.body;

  try {
    if (!student_id || !title || !author || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newRequest = await BookPurchaseRequest.create({
      student_id,
      title,
      author,
      category
    });

    res.status(201).json({
      message: "Book request submitted successfully",
      request: newRequest
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* -------------------------------------------------
   STUDENT: Get own book requests
-------------------------------------------------- */
export const getStudentBookRequests = async (req, res) => {
  const { studentId } = req.params;

  try {
    const requests = await BookPurchaseRequest.find({
      student_id: studentId
    }).sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* -------------------------------------------------
   ADMIN: Get all book purchase requests
-------------------------------------------------- */
export const getAllBookRequests = async (req, res) => {
  try {
    const requests = await BookPurchaseRequest.find()
      .populate("student_id", "name email department")
      .sort({ createdAt: -1 });

    res.status(200).json(requests);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

/* -------------------------------------------------
   ADMIN: Approve / Reject book request
-------------------------------------------------- */
export const updateBookRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body; 

  try {
    const request = await BookPurchaseRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: "Request not found" });
    }
    request.status = status;
    await request.save();

    res.status(200).json({
      message: "Request status updated",
      request
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
