import { Request, Response } from "express";
import { dateMessageByDirectMessageChannelModel } from "../models/dateMessageByDirectMessageChannel.model";
import { main as mm } from "../models/message.model";
import { userModel } from "../models/user.model";
import { isSameDate } from "../utils/formatDate";

const queryDateMessageByDirectMessageChannel = async (
  req: Request<{ id: string }>,
  res: Response
) => {
  try {
    const m = await dateMessageByDirectMessageChannelModel();
    const mMain = await mm();
    const dates = await m.queryDateMessageByDirectMessageChannel({
      where: { directMessageChannelId: parseInt(req.params.id) },
    });
    const messages = await mMain.queryMessages({
      orderBy: { created_at: "asc" },
    });

    const um = await userModel();
    const messagesByDates = await Promise.all(
      dates.map(async (date) => {
        const messagesByDate = messages.filter(
          ({ dateMessageIdByDirectMessageChannel }) => {
            return date.id === dateMessageIdByDirectMessageChannel;
          }
        );
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
    const m = await mm();
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

export default {
  queryDateMessageByDirectMessageChannel,
  createDateMessageByDirectMessageChannel,
};
