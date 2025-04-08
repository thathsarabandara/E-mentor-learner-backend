import { Router } from "express";
import { register }  from '../controllers/auth/register.controller';

const authRouter = Router();

authRouter.post('/register', register);
authRouter.post('/verifyotp', register);

export default authRouter;