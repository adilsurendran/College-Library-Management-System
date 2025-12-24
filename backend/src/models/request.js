import mongoose from "mongoose";


const requestSchema = new mongoose.Schema({
    student_id:{type:mongoose.Schema.Types.ObjectId, ref:"Student"},
    book_id:{type:mongoose.Schema.Types.ObjectId, ref:"Book"},
    issueDate:{type:Date, required:true},
    returnDate:{ type: Date, default: null},
    status:{type:String,default:"pending"},
    actual_returnDate:{type:Date,default:null}
})

const REQUEST = mongoose.model("Request",requestSchema)
export default REQUEST