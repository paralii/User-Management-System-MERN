import mongoose from "mongoose";

const connectDB = async()=>{
    try{
        await mongoose.connect('mongodb://localhost:27017/ums');
        console.log("MongoDB connected ✅");
    }
    catch(error){
        console.error("Mongodb connection failed ❌",error.message);
        process.exit(1);
    }
}

export default connectDB
