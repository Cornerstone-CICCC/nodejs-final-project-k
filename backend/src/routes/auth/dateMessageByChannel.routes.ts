import { Router } from "express";
import dateMessageController from "../../controllers/dateMessageByChannel.controller";

const messageRouter = Router();

messageRouter.get("/:id", dateMessageController.queryDateMessageByChannel);

export default messageRouter;
