import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import { getSubFromToken, getToken } from "../utils/jwt";

const queryUsers = async (req: Request, res: Response) => {
  const { error, token } = getToken(req.headers.authorization);
  if (error) {
    res.status(401).send({ error });
    return;
  }
  const { sub } = getSubFromToken(token);

  try {
    const directMessageChannels = await fetch(
      "http://localhost:8080/api/auth/direct-message-channels",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const directMessageChannelsJson: { id: number; name: string }[] =
      await directMessageChannels.json();
    const m = await userModel();
    const users = await m.queryUsers({
      where: {
        id: { not: sub },
        userName: {
          notIn: directMessageChannelsJson.map((c) => {
            return c.name;
          }),
        },
      },
    });
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying users");
  }
};

export default { queryUsers };
