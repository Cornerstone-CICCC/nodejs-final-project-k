import { Request, Response } from "express";
import { userModel } from "../models/user.model";

const signup = async (
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

export default { signup };
