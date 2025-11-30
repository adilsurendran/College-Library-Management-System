import mongoose from "mongoose";


const studentSchema = new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true,unique:true},
    password:{type:String, required:true},
    department:{type:String, required:true},
    regDate:{type:Date, required:true},
    photo:{type:String},
    loginID:{type:mongoose.Schema.Types.ObjectId,
        ref:"Login"
    }
},
{timestamps:true}
)

// Keep these - very useful since you'll query by email and department frequently
studentSchema.index({ email: 1 });        // For login, user lookup
studentSchema.index({ department: 1 });   // For filtering students by department

// You might also consider:
studentSchema.index({ createdAt: -1 });   // For getting recent students

const STUDENT = mongoose.model("Student",studentSchema)
export default STUDENT