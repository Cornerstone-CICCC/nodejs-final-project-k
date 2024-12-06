import { Request, Router } from "express";
import userController from "../../controllers/user.controller";
import directMessageChannelController from "../../controllers/directMessageChannelOnUsers.controller";
import dateMessageController from "../../controllers/dateMessageByDirectMessageChannel.controller";
import channelController from "../../controllers/channel.controller";
import dateMessageByChannelController from "../../controllers/dateMessageByChannel.controller";
import { validateToken } from "../../utils/jwt";

const authRouter = Router();

authRouter.use((req, res, next) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  if (jwtSecret === "") {
    res.status(404).send({ token: "", error: "jwtSecret not found" });
    return;
  }

  const { authorization } = req.headers;
  if (authorization === undefined) {
    res.status(401).send({ error: "Authorization header is required" });
    return;
  }

  const bearer = authorization.replace("Bearer", "").trim();
  if (bearer === "") {
    res.status(401).send({ error: "token not found" });
    return;
  }

  const token = bearer.replace("token=", "").trim();

  const { error } = validateToken(token);
  if (error !== null) {
    res.status(401).send({ error });
    return;
  }
  next();
});

authRouter.get("/users", userController.queryUsers);

authRouter.get(
  "/direct-message-channels",
  directMessageChannelController.queryDirectMessageChannels
);

authRouter.get(
  "/date-messages-by-direct-message-channel/:id",
  dateMessageController.queryDateMessageByDirectMessageChannel
);

authRouter.get("/channels", channelController.queryChannels);

authRouter.get(
  "/date-messages-by-channel/:id",
  dateMessageByChannelController.queryDateMessageByChannel
);

export default authRouter;
