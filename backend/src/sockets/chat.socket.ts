import { Server, Socket } from "socket.io";
import dateMessageByDirectMessageChannelController from "../controllers/dateMessageByDirectMessageChannel.controller";
import dateMessageByChannelController from "../controllers/dateMessageByChannel.controller";
import directMessageChannelController from "../controllers/directMessageChannelOnUsers.controller";
import channelController from "../controllers/channel.controller";
import { getSubFromToken, validateToken } from "../utils/jwt";

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
        const { error } = validateToken(data.token);
        if (error) {
          console.error(error);
          return;
        }
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
      "sendMessageFromDm",
      async (data: {
        text: string;
        token: string;
        directMessageChannelId: string;
      }) => {
        const { error } = validateToken(data.token);
        if (error) {
          console.error(error);
          return;
        }
        const { sub } = getSubFromToken(data.token);
        try {
          await dateMessageByDirectMessageChannelController.createDateMessageByDirectMessageChannel(
            {
              text: data.text,
              userId: sub,
              directMessageChannelId: parseInt(data.directMessageChannelId),
            }
          );
          io.emit("newMessageFromDm");
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on(
      "sendMessageFromChannel",
      async (data: { text: string; token: string; channelId: string }) => {
        const { error } = validateToken(data.token);
        if (error) {
          console.error(error);
          return;
        }
        const { sub } = getSubFromToken(data.token);
        try {
          await dateMessageByChannelController.createDateMessageByChannel({
            text: data.text,
            userId: sub,
            channelId: parseInt(data.channelId),
          });
          io.emit("newMessageFromChannel");
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on(
      "updateMessageFromChannel",
      async (data: { text: string; messageId: number; token: string }) => {
        const { error } = validateToken(data.token);
        if (error) {
          console.error(error);
          return;
        }
        try {
          await dateMessageByChannelController.updateDateMessageByChannel({
            text: data.text,
            messageId: data.messageId,
          });
          io.emit("updatedMessageFromChannel");
        } catch (error) {
          console.error(error);
        }
      }
    );

    socket.on(
      "deleteMessageFromChannel",
      async (data: { messageId: number; token: string }) => {
        const { error } = validateToken(data.token);
        if (error) {
          console.error(error);
          return;
        }
        try {
          await dateMessageByChannelController.deleteDateMessageByChannel({
            messageId: data.messageId,
          });
          io.emit("deleteMessageFromChannel");
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
