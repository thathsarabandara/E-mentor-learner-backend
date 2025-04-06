import { Router } from "express";
import { register }  from '../controllers/auth/register.controller';

const authRouter = Router();

authRouter.post('/register', register);

export default authRouter;