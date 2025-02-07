import User from "../Models/userModel.js";
import bcrypt from 'bcrypt' ;
import jwt from 'jsonwebtoken' ;
import "dotenv/config";
import fs from "fs";
import { resolve } from "path";
const secret_key = process.env.JWT_SECRET;
const BASE_URL = process.env.BASE_URL;


//verify admin
const loginAdmin = async (req,res) =>{
   
    const {email,password} = req.body;

    if(!email || !password){
        return res.status(401).json({message : "Email and password are required"});
    }

    try{
        const admin = await User.findOne({email});

        if(!admin){
            return res.status(400).json({message : "Invalid Credentials"});
        }

        if(admin.role !=='admin'){
            return res.status(401).json({message : "Invalid Email or Password"});
        }

        const isPasswordValid = await bcrypt.compare(password , admin.password);

        if(!isPasswordValid){
            return res.status(401).json({message : "Invalid Password"});
        }

        const token = jwt.sign(
            {id : admin._id , role : admin.role},
            secret_key,
            {expiresIn : process.env.JWT_EXPIRES_IN}
        );

        res.status(200).json({
            message : "Login successfull",
            token,
            user : {id : admin._id , role : admin.role , name : admin.name}
        })

    }
    catch(error){
        return res.status(500).json({message : "Internal Server Error" , error : error.message})
    }
}


// get user details
const fetchUsers = async (req,res) =>{
    try{
        const users = await User.find({role : "user"});
        
        const usersWithFullPicUrl = users.map(user =>{
            const fullPicUrl = user.profilePic 
            ? `${BASE_URL}/${user.profilePic.replace(/\\/g, '/')}`
            : `${BASE_URL}/uploads/default-image.png`;

            return{
                ...user._doc,
                profilePic : fullPicUrl,
            };
        });

        return res.status(201).json({users : usersWithFullPicUrl});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal server error"});
    }
}


const addUser = async(req,res) =>{
    try{
        const {name , email , mobile , password } = req.body ;
        

        const user = await User.findOne({$or : [ {email} , {mobile} ] } );

        if(user){
            if(user.email === email){
                return res.status(409).json({message :"Email already exists"});
            }
            if(user.mobile === mobile){
                return res.status(409).json({message :"Mobile number already exists"});
            }
        }

        const hashedPassword = await bcrypt.hash(password,10);

        const newUser = new User({
            name,
            email,
            mobile,
            password:hashedPassword,
        });

        await newUser.save();

        res.status(201).json({message : "User created Successfully"});

    }
    catch(error){
        console.log(error);
        return res.status(500).json({message : "Internal Server error",error : error.message});
    }
}

//Update users 
const updateUser = async (req,res) =>{
    try{
        const {id} = req.params;

        const {  name , email , mobile} = req.body;

        const user = await User.findById(id);
        
        if(user.email !== email){
            const isExist = await User.findOne({email});
            if(isExist){
                return res.status(401).json({message :"Email already exists"});
            }
        }

        if(user.mobile !== mobile){
            const isExist = await User.findOne({mobile});
            if(isExist){
                return res.status(401).json({message : "Mobile number already exist"});
            }
        }

        await User.findByIdAndUpdate(id,{name,email,mobile});

        return res.status(201).json({message :"Profile Updated successfully"});
    }
    catch(error){
        console.log(error);
        return res.status(500).json({message :"Internal server error"});
    }
}

//delete user

const deleteUser = async(req,res) =>{
    try{
        const {id} = req.params;

        const user = await User.findById(id);

        if(user.profilePic){
            const profilePath = resolve(user.profilePic);

            fs.unlink(profilePath,(err)=>{
                if(err) console.log("error deleting old image:",err);
            })
        }

        await User.findByIdAndDelete(id);

        return res.status(201).json({message : "User deleted successfully"});
    }
    catch(error){

        return res.status(500).json({message :"Internal server error" , error : error.message});

    }
}
    
export  {loginAdmin , fetchUsers , updateUser , addUser , deleteUser} ;