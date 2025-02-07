import express from 'express'
import {insertUser,loginUser,profileUpdate,profile} from "../controllers/userController.js"
import { verifyToken } from '../Middleware/auth.js';
import upload from "../utils/multer.js";

const userRoute= express.Router();

userRoute.post('/signup',insertUser);
userRoute.post("/login",loginUser);
userRoute.get('/profile',verifyToken,profile);
userRoute.post("/updateProfile",verifyToken,upload.single('profile') ,profileUpdate);

export default userRoute   
