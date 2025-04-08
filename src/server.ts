import express from "express";
import connectDB from "./config/Database";
import dotenv from "dotenv";
import learnerRouter from "./routes/learner.route";
import authRouter from "./routes/auth.route";
import { corsOption } from "./middlewares/cors/cors.middleware";
import cors from 'cors';
import helmet from "helmet";
import { connectRedis } from "./config/redis.config";
import cookieParser from 'cookie-parser';

const app = express();
dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors(corsOption));
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/learner', learnerRouter);

connectDB();
connectRedis();

const port = process.env.PORT || 5001
app.listen(port, () => {
    console.log("E-mentor server is running on ", port);
})