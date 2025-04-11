import { auth } from "../middlewares/auth/auth.middleware";
import { search } from "../controllers/learner/search.controller";
import { Router } from "express";

const learnerRouter = Router();

learnerRouter.get('/', auth('learner'), search );
learnerRouter.get('/cart', auth('learner'), search );
learnerRouter.get('/wishlist', auth('learner'), search );
learnerRouter.get('/notification', auth('learner'), search );

export default learnerRouter;