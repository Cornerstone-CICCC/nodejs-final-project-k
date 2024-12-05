import { Router } from "express";
import directMessageChannel from "../controllers/directMessageChannelOnUsers.controller";

const directMessageChannelRouter = Router();

directMessageChannelRouter.get(
  "/",
  directMessageChannel.queryDirectMessageChannelsFromHttp
);
// directMessageChannelRouter.get(
//   "/:id",
//   directMessageChannel.queryDirectMessageChannels
// );

export default directMessageChannelRouter;
