import { Server, Socket } from "socket.io";
import messageController from "../controllers/message.controller";
import directMessageChannelController from "../controllers/directMessageChannelOnUsers.controller";
import channelController from "../controllers/channel.controller";
import { getSubFromToken, HMAC_SHA256 } from "../utils/jwt";

export const setupChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    // On connect
    console.log(`User connected: ${socket.id}`);

    socket.on("createChannel", async (data: { name: string }) => {
      try {
        const id = await channelController.createChannel({
          data: { name: data.name },
        });
        io.emit("newChannel", { id: String(id) });
      } catch (error) {
        console.error(error);
      }
    });

    // https://github.com/Cornerstone-CICCC/nodejs-midterm-project-kupuma-ru21/blob/master/backend/src/routes/restaurant.routes.ts
    socket.on(
      "createDirectMessageChannel",
      async (data: { userId: number; token: string }) => {
        validateToken(data.token);
        const { sub } = getSubFromToken(data.token);
        try {
          const id =
            await directMessageChannelController.createDirectMessageChannel([
              { userId: data.userId },
              { userId: sub },
            ]);

          io.emit("newDirectMessageChannel", { id: String(id) });
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on(
      "sendMessage",
      async (data: {
        text: string;
        token: string;
        directMessageChannelId: string;
      }) => {
        validateToken(data.token);
        const { sub } = getSubFromToken(data.token);
        try {
          await messageController.createDateMessageByDirectMessageChannel({
            text: data.text,
            userId: sub,
            directMessageChannelId: parseInt(data.directMessageChannelId),
          });
          io.emit("newMessage");
        } catch (error) {
          console.error(error);
        }
      }
    );
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
