import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("E-Mentor db connected successfully");
    } catch (error) {
        console.error("E-Mentor db connection error", error);
        process.exit(1);
    }
}

export default connectDB;