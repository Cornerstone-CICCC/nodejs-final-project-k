import { Request, Response } from "express";
import { main } from "../models/message.model";
import { main as dmMain } from "../models/date_message.model";
import { MessageData } from "../types/message_data";
import { isSameDate } from "../utils/formatDate";

const queryMessages = async (_: Request, res: Response) => {
  try {
    const m = await main();
    const messages = await m.queryMessages();
    res.json(messages);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying messages");
  }
};

const createMessage = async (
  req: Request<{}, {}, MessageData>,
  res: Response
) => {
  try {
    const dmm = await dmMain();
    const m = await main();
    const messagesByDates = await dmm.queryDateMessages();
    const today = new Date();
    const messagesByDate = messagesByDates.find(({ created_at }) => {
      return isSameDate(created_at, today);
    });

    if (messagesByDate) {
      const message = await m.createMessage({
        ...req.body,
        dateMessageId: messagesByDate.id,
      });
      res.json(message);
      return;
    }

    const messagesByDateCreated = await dmm.createDateMessage();
    const message = await m.createMessage({
      ...req.body,
      dateMessageId: messagesByDateCreated.id,
    });
    res.json(message);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating message");
  }
};

export default { queryMessages, createMessage };
