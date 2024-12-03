import { Request, Response } from "express";
import { main } from "../models/message.model";
import { main as dmMain } from "../models/date_message.model";
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

const createMessage = async (data: { text: string; userId: number }) => {
  try {
    const dmm = await dmMain();
    const m = await main();
    const messagesByDates = await dmm.queryDateMessages();
    const today = new Date();
    const messagesByDate = messagesByDates.find(({ created_at }) => {
      return isSameDate(created_at, today);
    });

    if (messagesByDate) {
      return await m.createMessage({
        ...data,
        dateMessageId: messagesByDate.id,
      });
    }

    const messagesByDateCreated = await dmm.createDateMessage();
    return await m.createMessage({
      ...data,
      dateMessageId: messagesByDateCreated.id,
    });
  } catch (error) {
    console.error(error);
    throw new Error(JSON.stringify(error));
  }
};

export default { queryMessages, createMessage };
