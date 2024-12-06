import { Prisma } from "@prisma/client";
import { channelModel } from "../models/channel.model";
import { Request, Response } from "express";
import { getSubFromToken, getToken } from "../utils/jwt";

const createChannel = async (input: Prisma.ChannelCreateArgs) => {
  try {
    const m = await channelModel();
    const c = await m.createChannel(input);
    return c.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const queryChannels = async (_: Request, res: Response) => {
  try {
    const m = await channelModel();
    res.status(200).json(await m.queryChannels({}));
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying users");
  }
};

export default {
  createChannel,
  queryChannels,
};
