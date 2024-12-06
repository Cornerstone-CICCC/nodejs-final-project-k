import { Router } from "express";
import channel from "../../controllers/channel.controller";

const channelRouter = Router();

channelRouter.get("/", channel.queryChannels);

export default channelRouter;
