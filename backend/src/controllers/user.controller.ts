import { Request, Response } from "express";
import { main } from "../models/user.model";

const queryUsers = async (_: Request, res: Response) => {
  try {
    const m = await main();
    const users = await m.queryUsers();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error querying users");
  }
};

const createUser = async (_: Request, res: Response) => {
  try {
    const m = await main();
    const user = await m.createUser({});
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

export default { queryUsers, createUser };
