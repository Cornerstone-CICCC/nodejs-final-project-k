import crypto from "crypto";

export const HMAC_SHA256 = (key: string, data: string) => {
  const hash = crypto.createHmac("sha256", key).update(data).digest("base64");
  const hashNoPadding = hash.replace(/={1,2}$/, "");
  return hashNoPadding;
};

export const getSubFromToken = (token: string) => {
  const splits = token.split(".");
  const { sub }: { sub: number } = JSON.parse(
    Buffer.from(splits[1], "base64").toString()
  );
  return { sub };
};

export const getToken = (authorization: string | undefined) => {
  if (authorization === undefined) {
    return { token: "", error: "Authorization header is required" };
  }
  const bearer = authorization.replace("Bearer", "").trim();
  if (bearer === "") {
    return { token: "", error: "token not found" };
  }
  return { token: bearer.replace("token=", "").trim(), error: null };
};

export const validateToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  if (jwtSecret === "") return { error: "JWT_SECRET is not defined" };
  const splits = token.split(".");
  const unsignedToken = [splits[0], splits[1]].join(".");
  if (HMAC_SHA256(jwtSecret, unsignedToken) !== splits[2]) {
    return { error: "Invalid token" };
  }
  return { error: null };
};
