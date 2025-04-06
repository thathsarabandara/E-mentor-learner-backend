import express from "express";
import connectDB from "./config/Database";
import dotenv from "dotenv";
import learnerRouter from "./routes/Learner.route";
import authRouter from "./routes/auth.route";

const app = express();
dotenv.config();

app.use(express.json());

app.use('/auth', authRouter);
app.use('/auth', learnerRouter);

connectDB();

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log("E-mentor server is running on ", port);
})