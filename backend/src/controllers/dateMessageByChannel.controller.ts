import { Request, Response } from "express";
import { dateMessageByChannelModel } from "../models/dateMessageByChannel.model";
import { userModel } from "../models/user.model";
import { messageByChannelModel } from "../models/messageByChannel.model";
import { isSameDate } from "../utils/formatDate";

const queryDateMessageByChannel = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const m = await dateMessageByChannelModel();
    const mMain = await messageByChannelModel();
    const dates = await m.queryDateMessageByChannel({
      where: { channelId: parseInt(req.params.id) },
    });
    const messages = await mMain.queryMessages({
      orderBy: { created_at: "asc" },
    });

    const um = await userModel();
    const messagesByDates = await Promise.all(
      dates.map(async (date) => {
        const messagesByDate = messages.filter(({ dateMessageIdByChannel }) => {
          return date.id === dateMessageIdByChannel;
        });
        return {
          ...date,
          messages: await Promise.all(
            messagesByDate.map(async ({ userId, ...rest }) => {
              const u = await um.queryUser({ where: { id: userId } });
              return { ...rest, userName: u?.userName ?? "not found" };
            })
          ),
        };
      })
    );
    res.status(200).json(messagesByDates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying messages");
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
    const m = await messageByChannelModel();
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
          dateMessageIdByChannel: messagesByDate.id,
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

const updateDateMessageByChannel = async ({
  text,
  messageId,
}: {
  text: string;
  messageId: number;
}) => {
  try {
    const m = await messageByChannelModel();
    return await m.updateMessage({ where: { id: messageId }, data: { text } });
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
};

const deleteDateMessageByChannel = async ({
  messageId,
}: {
  messageId: number;
}) => {
  try {
    const m = await messageByChannelModel();
    return await m.deleteMessage({ where: { id: messageId } });
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
};

export default {
  queryDateMessageByChannel,
  createDateMessageByChannel,
  updateDateMessageByChannel,
  deleteDateMessageByChannel,
};
