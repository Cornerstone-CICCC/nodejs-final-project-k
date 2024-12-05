import { Router } from "express";
import loginController from "../controllers/login.controller";

const userRouter = Router();

userRouter.post("/", loginController.login);

export default userRouter;
