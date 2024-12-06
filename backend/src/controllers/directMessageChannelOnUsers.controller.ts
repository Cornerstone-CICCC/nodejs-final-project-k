import { Request, Response } from "express";
import { directMessageChannelOnUsersModel } from "../models/directMessageChannelOnUsers.model";
import { directMessageChannelModel } from "../models/directMessageChannel.model";
import { userModel } from "../models/user.model";
import { getSubFromToken, getToken } from "../utils/jwt";

const queryDirectMessageChannels = async (req: Request, res: Response) => {
  const { error, token } = getToken(req.headers.authorization);
  if (error) {
    res.status(401).send({ error });
    return;
  }
  const { sub } = getSubFromToken(token);

  try {
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
    const um = await userModel();
    const result = await Promise.all(
      dmChannelsWithOthers.map(async (c) => {
        const u = await um.queryUser({ where: { id: c.userId } });
        return {
          id: c.directMessageChannelId,
          name: u?.userName ?? "not found",
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
  queryDirectMessageChannels,
  createDirectMessageChannel,
};
