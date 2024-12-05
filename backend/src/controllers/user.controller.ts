import { Request, Response } from "express";
import { userModel } from "../models/user.model";

const queryUsers = async (_: Request, res: Response) => {
  try {
    const m = await userModel();
    const users = await m.queryUsers();
    res.status(200).json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying users");
  }
};

const createUser = async (
  req: Request<{}, {}, { userName: string }>,
  res: Response
) => {
  try {
    const m = await userModel();
    const user = await m.createUser({ userName: req.body.userName });
    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

export default { queryUsers, createUser };
