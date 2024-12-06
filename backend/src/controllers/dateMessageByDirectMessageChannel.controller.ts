import { Request, Response } from "express";
import { dateMessageByDirectMessageChannelModel } from "../models/dateMessageByDirectMessageChannel.model";
import { main as mm } from "../models/message.model";
import { userModel } from "../models/user.model";

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

export default { queryDateMessageByDirectMessageChannel };
