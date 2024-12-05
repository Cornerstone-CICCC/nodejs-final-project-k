import { Request, Response } from "express";
import { directMessageChannelOnUsersModel } from "../models/directMessageChannelOnUsers.model";
import { directMessageChannelModel } from "../models/directMessageChannel.model";
import { userModel } from "../models/user.model";
import { getSubFromToken } from "../utils/jwt";

const queryDirectMessageChannelsFromHttp = async (
  req: Request,
  res: Response
) => {
  try {
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
    const { sub } = getSubFromToken(token);

    const m = await directMessageChannelOnUsersModel();
    const myDmChannels = await m.queryDirectMessageChannelOnUsers({
      where: { userId: sub },
    });
    const dmChannelsWithOthers = await m.queryDirectMessageChannelOnUsers({
      where: {
        userId: { not: sub },
        directMessageChannelId: {
          in: myDmChannels.map((c) => c.directMessageChannelId),
        },
      },
    });
    console.log("dmChannelsWithOthers", dmChannelsWithOthers);
    const um = await userModel();
    const result = await Promise.all(
      dmChannelsWithOthers.map(async (c) => {
        const u = await um.queryUser({ where: { id: c.userId } });
        return {
          id: c.directMessageChannelId,
          userName: u?.userName ?? "not found",
        };
      })
    );
    res.status(200).json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying users");
  }
};

const createDirectMessageChannel = async (userIds: { userId: number }[]) => {
  try {
    const m = await directMessageChannelModel();
    const c = await m.createDirectMessageChannel(userIds);
    return c.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export default {
  queryDirectMessageChannelsFromHttp,
  createDirectMessageChannel,
};
