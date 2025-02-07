import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:true,
            trim:true,
        },
        email:{
            type:String,
            required:true,
            unique:true,
            lowercase:true,
            trim:true
        },
        password:{
            type:String,
            required:true
          
        },
        mobile:{
            type:String,
            required:true,
            unique:true,
            match: [/^\d{10}$/, "Mobile number must be 10 digits"],
        },
        profilePic:{
            type:String,
            default:null
        },
        lastLogin:{
            type:String,
            default:null,
        },
        role:{
            type:String,
            enum:['user','admin'],
            default:"user",
        }
    }
)

const User = mongoose.model("User-DB",userSchema);

export default User