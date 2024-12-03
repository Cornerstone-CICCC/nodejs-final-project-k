import { Server, Socket } from "socket.io";
import messageController from "../controllers/message.controller";
import date_messageController from "../controllers/date_message.controller";

export const setupChatSocket = (io: Server) => {
  io.on("connection", (socket: Socket) => {
    // On connect
    console.log(`User connected: ${socket.id}`);

    socket.on("sendMessage", async (data: { text: string; userId: number }) => {
      try {
        await messageController.createMessage(data);
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
