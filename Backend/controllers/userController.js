import User from "../Models/userModel.js";
import { validateUser } from "../Validation/userValidation.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken'
import fs from 'fs'
import { resolve } from 'path'
import "dotenv/config";
const BASE_URL = process.env.BASE_URL;
const secret_key = process.env.JWT_SECRET;

//Registering a user

const insertUser = async(req,res)=>{
    const {name,email,mobile,password,role} = req.body;

    const validationErrors = validateUser(req.body);

    if(!name || !email || !mobile || !password){
        return res.status(400).json({message:"All fields are required"});
    }

    if(validationErrors){
        return res.status(400).json({
            message : "validation errors occured",
            errors : validationErrors                                     
        })
    }

    try{
        const existingUser = await User.findOne({email});
        if(existingUser){
            return res.status(400).json({message:"User already exists"});
        }

        const existingMobile = await User.findOne({mobile});
        if(existingMobile){
            return res.status(400).json({message:"Mobile Number already exists"});
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
           name,
           email,
           mobile,
           password:hashedPassword,
           role:role ||"user",
        });
  
        await newUser.save();

        res.status(201).json({message:"User Registered Successfully"});
    }
    catch(error){
        if(error.code === 11000){
            const duplicateField = Object.keys(error.keyValue)[0];
            return res.status(400).json({message:`User with this ${duplicateField} already exists`,})
        }
        res.status(500).json({message:"server error",error:error.message})
    }
}


//verifying user login
const loginUser = async (req,res) => {

    const {email,password} = req.body;

    if(!email || !password){
        return res.status(400).json({message:"Email and Password are required"});
    }

    try{
        const user = await User.findOne({email});

        if(!user){
            return res.status(400).json({message:"Email doesn't exist"});
        }

        if(user.role !== 'user'){
            return res.status(403).json({message : "Invalid Email or Password"})
        }

        const isPasswordValid = await bcrypt.compare(password,user.password);

        if(!isPasswordValid){
            return res.status(400).json({message:"Invalid email/password"});
        }

        const currentDate = new Date().toISOString().split('T')[0]; 

        await User.findByIdAndUpdate(user.id,{lastLogin : currentDate},{new : true,runValidators:true});


        //generate token
        const token = jwt.sign(
            {id:user._id , role:user.role},
            secret_key,
            {expiresIn : process.env.JWT_EXPIRES_IN}           
        )

        res.status(200).json({
            message:"Login Successful",
            token,
            user:{id:user._id , role:user.role ,name : user.name}
        });


    }
    catch(error){
        res.status(500).json({message:"Server errorrr"})
    }
};

//fetching the data
const profile = async (req,res) =>{
    try{
        const userDetails = await User.findById(req.user.id);

        const {name,email,mobile,role,profilePic} = userDetails;

        const fullPicUrl = profilePic ? `${BASE_URL}/${profilePic.replace(/\\/g, '/')}` : `${BASE_URL}/uploads/default-image.png` ;
        
        res.status(200).json({name,email,mobile,role,profilePic:fullPicUrl});
    }
    catch(error){
        res.status(500).json({message:"internal server error"});
    }
};



//updating the profile pic
const profileUpdate = async (req,res) =>{

    try{

      const file = req.file;

      if(!file){
        return res.status(400).json({message : "No file uploaded"});
      }

      const user = await User.findById(req.user.id);

      if(user.profilePic){
        const oldPath = resolve(user.profilePic);
        fs.unlink(oldPath,(err)=>{
            if(err) console.log("Error deleting old image :",err);
        })
      }

      user.profilePic = file.path;

      await user.save();

      res.status(200).json({message : "profile picture updated successfully" , profilePic : file.path})
  }
  catch(err){
    console.log("error in updating the image",err);
    res.status(500).json({message :"Server Error",error : err.message})
  }


}

 
export {insertUser,loginUser,profileUpdate,profile}
