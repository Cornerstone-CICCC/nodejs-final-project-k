import { Request, Response } from "express";
import { main } from "../models/date_message.model";
import { main as mm } from "../models/message.model";

const queryDateMessagesFromHttp = async (_: Request, res: Response) => {
  try {
    const m = await main();
    const mMain = await mm();
    const dates = await m.queryDateMessages();
    const messages = await mMain.queryMessages({
      orderBy: { created_at: "asc" },
    });
    const messagesByDates = dates.map((date) => {
      return {
        ...date,
        messages: messages.filter(({ dateMessageId }) => {
          return date.id === dateMessageId;
        }),
      };
    });
    res.status(200).json(messagesByDates);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying messages");
  }
};

const queryDateMessagesFromSocket = async () => {
  try {
    const m = await main();
    const mMain = await mm();
    const dates = await m.queryDateMessages();
    const messages = await mMain.queryMessages({
      orderBy: { created_at: "asc" },
    });
    const messagesByDates = dates.map((date) => {
      return {
        ...date,
        messages: messages.filter(({ dateMessageId }) => {
          return date.id === dateMessageId;
        }),
      };
    });
    return messagesByDates;
  } catch (error) {
    console.error(error);
    throw new Error("Error querying messages");
  }
};

export default { queryDateMessagesFromHttp, queryDateMessagesFromSocket };
