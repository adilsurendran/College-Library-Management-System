import BOOK from "../models/book.js";
import REQUEST from "../models/request.js";
import STUDENT from "../models/student.js";


// export const allstats = async(req,res)=>{
//     try{
//         // console.log("hi");
//         const totalBooks = await BOOK.countDocuments()
//         const totalStudents = await STUDENT.countDocuments()
//         const pendingRequests = await REQUEST.countDocuments({
//             status : "pending"
//         })
//         const issuedBooks = await REQUEST.countDocuments({status: "approved"})

//         console.log("totalBooks", totalBooks, "totalStudents", totalStudents, "pendingRequests", pendingRequests, "issuedBooks", issuedBooks);
        
        
//     }
//     catch(e){
//         console.log(e);
        
//     }
// }

export const allstats = async (req, res) => {
    try {
        const totalBooks = await BOOK.countDocuments();
        const totalStudents = await STUDENT.countDocuments();
        const pendingRequests = await REQUEST.countDocuments({ status: "pending" });
        const issuedBooks = await REQUEST.countDocuments({ status: "approved" });

        // Send proper response
        return res.json({
            success: true,
            stats: {
                totalBooks,
                totalStudents,
                pendingRequests,
                issuedBooks
            }
        });

    } catch (e) {
        console.log(e);
        return res.status(500).json({
            success: false,
            message: "Something went wrong",
            error: e.message
        });
    }
};
