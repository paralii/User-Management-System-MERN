import express from "express"
import cors from 'cors'
import connectDB from "./config/db.js";
import userRoute from "./Route/userRoute.js";
import adminRoute from "./Route/adminRoute.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads',express.static('uploads'));
app.use(cors())

connectDB();

app.use("/users",userRoute)
app.use("/admin",adminRoute);

app.listen(2211,()=>console.log("🚀 server started on port numbder : 2211"));