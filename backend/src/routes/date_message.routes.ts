import { Router } from "express";
import dateMessageController from "../controllers/date_message.controller";

const messageRouter = Router();

messageRouter.get("/", dateMessageController.queryDateMessagesFromHttp);

export default messageRouter;
