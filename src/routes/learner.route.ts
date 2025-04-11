import { auth } from "../middlewares/auth/auth.middleware";
import { search } from "../controllers/learner/search.controller";
import { Router } from "express";
import { profileDetails } from "../controllers/learner/auth.controller";

const learnerRouter = Router();

learnerRouter.get('/', auth('Learner'), profileDetails );
learnerRouter.get('/cart', auth('Learner'), search );
learnerRouter.get('/wishlist', auth('Learner'), search );
learnerRouter.get('/notification', auth('Learner'), search );

export default learnerRouter;