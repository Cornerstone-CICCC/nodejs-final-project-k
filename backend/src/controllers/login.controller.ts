import { Request, Response } from "express";
import { userModel } from "../models/user.model";
import { HMAC_SHA256 } from "../utils/jwt";

const login = async (
  req: Request<{}, {}, { userName: string }>,
  res: Response
) => {
  try {
    const jwtSecret = process.env.JWT_SECRET ?? "";
    if (jwtSecret === "") {
      res.status(404).json({ error: "JWT_SECRET not set" });
      return;
    }

    const m = await userModel();
    const user = await m.queryUser({ where: { userName: req.body.userName } });
    if (user === null) {
      res.status(404).json({ error: "User not found" });
      return;
    }

    // Create JWT
    // REF: https://qiita.com/knaot0/items/8427918564400968bd2b
    const header = { alg: "HS256", typ: "JWT" };
    const payload = { sub: user.id, iat: Math.floor(Date.now() / 1000) };
    const encodeBase64 = (json: Record<string, string | number>) => {
      const jsonStr = JSON.stringify(json);
      // Buffer creates a string which can take an optional encoding parameter to specify how to encode the string.
      const jsonB64 = Buffer.from(jsonStr).toString("base64");
      const jsonB64NoPadding = jsonB64.replace(/={1,2}$/, "");
      return jsonB64NoPadding;
    };
    const unsignedToken = `${encodeBase64(header)}.${encodeBase64(payload)}`;
    const signature = HMAC_SHA256(jwtSecret, unsignedToken);
    res.status(200).json(`${unsignedToken}.${signature}`);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error creating user");
  }
};

export default { login };
