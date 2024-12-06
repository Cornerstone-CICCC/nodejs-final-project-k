import { Router } from "express";
import dateMessageController from "../../controllers/dateMessageByDirectMessageChannel.controller";

const messageRouter = Router();

messageRouter.get(
  "/:id",
  dateMessageController.queryDateMessageByDirectMessageChannel
);

export default messageRouter;
