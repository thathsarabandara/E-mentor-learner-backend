import { Router } from "express";
import { register }  from '../controllers/auth/register.controller';
import { verifyOTP } from "../controllers/auth/verify.controller";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/verifyotp', verifyOTP);

export default authRouter;