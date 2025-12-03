import BOOK from "../models/book.js";
import REQUEST from "../models/request.js";
import STUDENT from "../models/student.js";


export const viewStudent = async (req,res)=>{
    try{
const Student = await STUDENT.find().sort({ createdAt: -1 });
    res.json(Student);
    }
    catch(e){
        console.log(e);
        res.status(500).json({ message: e.message });
    }
}

// export const issueRequest = async(req,res)=>{
//     const {selectedBook,issueDate,returnDate,student_id,status}= req.body
//     // console.log(selectedBook,issueDate,returnDate,student_id,status);
//     try{
//         const isBookAvailable = await BOOK.findById(selectedBook)
//         // console.log(isBookAvailable);
//         if (isBookAvailable && isBookAvailable.availableCopies>0) {
//             console.log("Book is availble");
//             const newreq = await REQUEST.create({
//                 student_id,
//                 book_id:selectedBook,
//                 issueDate,
//                 returnDate,
//                 status,
//                 actual_returnDate:returnDate
//             })

            
//         }
//         else{
//             return res.status(401).json({message:"Book is not Availble right now!!"})
//         }
        

//     }
// catch(e){
//     console.error(e)
// }
    
// }

export const issueRequest = async (req, res) => {
  const { selectedBook, issueDate, returnDate, student_id, status } = req.body;

  try {
    // 1. Check book availability
    const book = await BOOK.findById(selectedBook);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (book.availableCopies <= 0) {
      return res.status(400).json({ message: "Book is not available right now!" });
    }

    // 2. Create request
    const newReq = await REQUEST.create({
      student_id,
      book_id: selectedBook,
      issueDate,
      returnDate,
      status: status || "pending",
      actual_returnDate: null      // correct
    });


    // 3. Send success response
    return res.status(201).json({
      message: "Issue request submitted successfully",
      request: newReq
    });

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Server error" });
  }
};

// export const history = async(req,res)=>{
//     const {id} = req.params
//     // console.log(id);
//     try{
//         const allreq = await REQUEST.find({student_id:id})
//         console.log(allreq);
        
//     }
//     catch(e){
//         console.log(e);
        
//     }
// }

export const history = async (req, res) => {
  const { id } = req.params;

  try {
    const allreq = await REQUEST.find({ student_id: id })
      .populate("book_id", "title author category")  // get book details
      .populate("student_id", "fine")
      .sort({ createdAt: -1 });                       // newest first

    return res.status(200).json(allreq);

  } catch (e) {
    console.error(e);
    return res.status(500).json({ message: "Failed to load history" });
  }
};


// export const AllStats = async (req,res)=>{
//   const {id} = req.params
//   try{
//     const booksIssued = await REQUEST.countDocuments({student_id:id,status:"approved"})
//     const pendingRequests = await REQUEST.countDocuments({student_id:id,status:"pending"})
//     const booksRead = await REQUEST.countDocuments({student_id:id,status:"returned"})
//     console.log(booksIssued,pendingRequests,booksRead);
    
//   }
//   catch(e){
//     console.log(e);
    
//   }
// }

export const AllStats = async (req, res) => {
  const { id } = req.params;

  try {
    const booksIssued = await REQUEST.countDocuments({ student_id: id, status: "approved" });
    const pendingRequests = await REQUEST.countDocuments({ student_id: id, status: "pending" });
    const booksRead = await REQUEST.countDocuments({ student_id: id, status: "returned" });

    return res.json({
      success: true,
      stats: {
        booksIssued,
        pendingRequests,
        booksRead
      }
    });

  } catch (e) {
    console.log(e);
    return res.status(500).json({ success: false, message: e.message });
  }
};
