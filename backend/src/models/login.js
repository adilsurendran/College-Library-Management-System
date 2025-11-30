import mongoose from "mongoose";

const loginSchema = new mongoose.Schema({
    username:{type:String, required:true},
    password:{type:String, required:true},
    role:{type:String, required:true}
},
{ timestamps: true }
)

loginSchema.index({username: 1});

const LOGIN = mongoose.model("Login", loginSchema)
export default LOGIN