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