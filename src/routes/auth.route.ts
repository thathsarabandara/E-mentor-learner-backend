import { Router } from "express";
import { register }  from '../controllers/auth/register.controller';
import { verifyOTP } from "../controllers/auth/verify.controller";
import { resendOtp } from "../controllers/auth/otpResend.controller";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/verifyotp', verifyOTP);
authRouter.get('/resendotp', resendOtp);

export default authRouter;