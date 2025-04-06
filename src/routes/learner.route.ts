import { search } from "../controllers/learner/search.controller";
import { Router } from "express";

const learnerRouter = Router();

learnerRouter.get('/courses', search );

export default learnerRouter;