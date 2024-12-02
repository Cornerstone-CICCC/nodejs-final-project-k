import { Router } from "express";
import messageController from "../controllers/message.controller";

const messageRouter = Router();

messageRouter.get("/", messageController.queryMessages);
messageRouter.post("/create", messageController.createMessage);

export default messageRouter;
