import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://127.0.0.1:27017/UMS');
        console.log("MongoDB connected successfully");
    }
    catch(error){
        console.error("Mongodb connection failed",error.message);
        process.exit(1);
    }
}

export default connectDB
