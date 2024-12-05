import { Server, Socket } from "socket.io";
import messageController from "../controllers/message.controller";
import date_messageController from "../controllers/date_message.controller";
import directMessageChannelController from "../controllers/directMessageChannelOnUsers.controller";
import { getSubFromToken, HMAC_SHA256 } from "../utils/jwt";

export const setupChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    // On connect
    console.log(`User connected: ${socket.id}`);

    // https://github.com/Cornerstone-CICCC/nodejs-midterm-project-kupuma-ru21/blob/master/backend/src/routes/restaurant.routes.ts
    socket.on(
      "createDirectMessageChat",
      async (data: { userId: number; token: string }) => {
        validateToken(data.token);
        const { sub } = getSubFromToken(data.token);
        try {
          await directMessageChannelController.createDirectMessageChannel([
            { userId: data.userId },
            { userId: sub },
          ]);
          io.emit("newDirectMessageChannels");
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on("sendMessage", async (data: { text: string; token: string }) => {
      validateToken(data.token);
      const { sub } = getSubFromToken(data.token);
      try {
        await messageController.createMessage({ text: data.text, userId: sub });
        io.emit(
          "newMessage",
          await date_messageController.queryDateMessagesFromSocket()
        );
      } catch (error) {
        console.error(error);
      }
    });
    // On disconnect
    socket.on("disconnect", () => {
      console.log(`User disconnected: ${socket.id}`);
    });
    console.log("------------------");
  });
};

const validateToken = (token: string) => {
  const jwtSecret = process.env.JWT_SECRET ?? "";
  if (jwtSecret === "") throw new Error("JWT_SECRET is not defined");
  const splits = token.split(".");
  const unsignedToken = [splits[0], splits[1]].join(".");
  if (HMAC_SHA256(jwtSecret, unsignedToken) !== splits[2]) {
    throw new Error("Invalid token");
  }
};
