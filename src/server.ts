import express from "express";
import connectDB from "./config/Database";
import dotenv from "dotenv";

const app = express();
dotenv.config();

app.use(express.json());

connectDB();

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log("E-mentor server is running on ", port);
})