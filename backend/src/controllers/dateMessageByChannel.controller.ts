import { Request, Response } from "express";
import { dateMessageByChannelModel } from "../models/dateMessageByChannel.model";
import { messageByChannelModel } from "../models/message.model";
import { userModel } from "../models/user.model";

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

export default { queryDateMessageByChannel };
