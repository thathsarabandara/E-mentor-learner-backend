import { Router } from "express";
import { register }  from '../controllers/auth/register.controller';
import { verifyOTP } from "../controllers/auth/verify.controller";
import { resendOtp } from "../controllers/auth/otpResend.controller";
import { passwordResetRequest, resetPassword, verifyResetToken } from "../controllers/auth/passReset.controller";

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/verifyotp', verifyOTP);
authRouter.post('/resetrequest', passwordResetRequest);
authRouter.post('/resetpassword', resetPassword);
authRouter.get('/verifyresettoken', verifyResetToken);
authRouter.get('/resendotp', resendOtp);

export default authRouter;