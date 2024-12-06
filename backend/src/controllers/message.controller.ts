import { Request, Response } from "express";
import { main } from "../models/message.model";
import { dateMessageByDirectMessageChannelModel } from "../models/dateMessageByDirectMessageChannel.model";
import { dateMessageByChannelModel } from "../models/dateMessageByChannel.model";
import { isSameDate } from "../utils/formatDate";

const queryMessages = async (_: Request, res: Response) => {
  try {
    const m = await main();
    const messages = await m.queryMessages();
    res.status(200).json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying messages");
  }
};

const createDateMessageByDirectMessageChannel = async ({
  directMessageChannelId,
  ...rest
}: {
  text: string;
  userId: number;
  directMessageChannelId: number;
}) => {
  try {
    // TODO: transaction
    const dmm = await dateMessageByDirectMessageChannelModel();
    const m = await main();
    const messagesByDates = await dmm.queryDateMessageByDirectMessageChannel({
      where: { directMessageChannelId },
    });
    const today = new Date();
    const messagesByDate = messagesByDates.find(({ created_at }) => {
      return isSameDate(created_at, today);
    });

    if (messagesByDate) {
      return await m.createMessage({
        data: {
          ...rest,
          dateMessageIdByDirectMessageChannel: messagesByDate.id,
        },
      });
    }

    const messagesByDateCreated =
      await dmm.createDateMessageByDirectMessageChannel({
        data: { directMessageChannelId },
      });
    return await m.createMessage({
      data: {
        ...rest,
        dateMessageIdByDirectMessageChannel: messagesByDateCreated.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
};

const createDateMessageByChannel = async ({
  channelId,
  ...rest
}: {
  text: string;
  userId: number;
  channelId: number;
}) => {
  try {
    // TODO: transaction
    const dmm = await dateMessageByChannelModel();
    const m = await main();
    const messagesByDates = await dmm.queryDateMessageByChannel({
      where: { channelId },
    });
    const today = new Date();
    const messagesByDate = messagesByDates.find(({ created_at }) => {
      return isSameDate(created_at, today);
    });

    if (messagesByDate) {
      return await m.createMessage({
        data: {
          ...rest,
          dateMessageIdByDirectMessageChannel: messagesByDate.id,
        },
      });
    }

    const messagesByDateCreated = await dmm.createDateMessageByChannel({
      data: { channelId },
    });
    return await m.createMessage({
      data: {
        ...rest,
        dateMessageIdByChannel: messagesByDateCreated.id,
      },
    });
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
};

export default { queryMessages, createDateMessageByDirectMessageChannel };
