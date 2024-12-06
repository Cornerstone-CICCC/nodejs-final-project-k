import { Router } from "express";
import directMessageChannel from "../controllers/directMessageChannelOnUsers.controller";

const directMessageChannelRouter = Router();

directMessageChannelRouter.get(
  "/",
  directMessageChannel.queryDirectMessageChannels
);

export default directMessageChannelRouter;
