import REQUEST from "../models/request.js"


// export const allrequest = async(req,res)=>{
//     // console.log("hi");
//     try{
//         const allreq = await REQUEST.find().populate("student_id", "name department fine").populate("book_id", "title author availableCopies").sort({createdAt:-1})
//     }
//     catch(e){
//         console.log(e);
        
//     }
    
// }

export const allrequest = async (req, res) => {
  try {
    const allreq = await REQUEST.find()
      .populate("student_id", "name department fine email")
      .populate("book_id", "title author category availableCopies")
      .sort({ createdAt: -1 });

    return res.status(200).json(allreq);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to load issue requests" });
  }
};

// export const statusUpdate = async(req,res)=>{
//     const {id}= req.params
//     const {newStatus} = req.body

//     // console.log(id,newStatus);
//     try{
//         const reqest = await REQUEST.findByIdAndUpdate(id,{status:newStatus})
//     }
    

// }

export const statusUpdate = async (req, res) => {
  const { id } = req.params;
  const { newStatus } = req.body;

  try {
    // 1. Find the request
    const requestDoc = await REQUEST.findById(id).populate("book_id");
    if (!requestDoc) {
      return res.status(404).json({ message: "Request not found" });
    }

    // 2. Handle APPROVE
    if (newStatus === "approved") {
      const book = requestDoc.book_id;

      // Check availability
      if (book.availableCopies <= 0) {
        return res.status(400).json({ message: "Book is not available" });
      }

      // Decrease available copies
      book.availableCopies -= 1;
      await book.save();

      // Set issue date + update status
    //   requestDoc.issueDate = new Date();
      requestDoc.status = "approved";
    }

    // 3. Handle REJECT (no reason)
    else if (newStatus === "rejected") {
      requestDoc.status = "rejected";
    }

    // 4. Edge case: set to pending
    else {
      requestDoc.status = "pending";
    }

    // 5. Save updated request
    await requestDoc.save();

    return res.status(200).json({
      message: "Status updated successfully",
      request: requestDoc
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// export const bookreturn= async(req,res)=>{
//     const{id} = req.params
//     const {returnDate,fine} = req.body
//     // console.log(id,fine,returnDate);
    
// }

export const returnBook = async (req, res) => {
  const { id } = req.params;
  const { returnDate, fine } = req.body;

  try {
    const request = await REQUEST.findById(id)
      .populate("book_id")
      .populate("student_id");

    if (!request) return res.status(404).json({ message: "Request not found" });

    // Update book copies
    request.book_id.availableCopies += 1;
    await request.book_id.save();

    // Update student fine
    request.student_id.fine += fine;
    await request.student_id.save();

    // Update request
    request.actual_returnDate = returnDate;
    request.fine = fine;
    request.status = "returned";
    await request.save();

    return res.status(200).json({
      message: "Book returned successfully",
      request,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
};
