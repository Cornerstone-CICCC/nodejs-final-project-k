import { Router } from "express";
import signupController from "../controllers/signup.controller";

const signupRouter = Router();

signupRouter.post("/", signupController.signup);

export default signupRouter;
