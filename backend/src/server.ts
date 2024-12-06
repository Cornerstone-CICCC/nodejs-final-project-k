import express, { Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { createServer } from "http";
import { setupChatSocket } from "./sockets/chat.socket";
import { Server } from "socket.io";
import cors from "cors";

dotenv.config();

// Create server
const app = express();

// Middleware
app.use(cors({ origin: "http://localhost:3000" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const server = createServer(app);
const io = new Server(server, {
  cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});

// Routes
import userRouter from "./routes/user.routes";
app.use("/api/users", userRouter);

import loginRouter from "./routes/login.routes";
app.use("/api/login", loginRouter);

import directMessageChannelRouter from "./routes/directMessageChannelOnUsers.routes";
app.use("/api/direct-message-channels", directMessageChannelRouter);

import dateMessageByDirectMessageChannelRouter from "./routes/dateMessageByDirectMessageChannel.routes";
app.use(
  "/api/date-messages-by-direct-message-channel",
  dateMessageByDirectMessageChannelRouter
);

import channelRouter from "./routes/channel.routes";
app.use("/api/channels", channelRouter);

import dateMessageByChannelRouter from "./routes/dateMessageByChannel.routes";
app.use("/api/date-messages-by-channel", dateMessageByChannelRouter);

// 404 Fallback
app.use((_, res: Response) => {
  res.status(404).send("Invalid route");
});

// Start server
server.listen(8080, () => {
  setupChatSocket(io);
  console.log("Server is running on http://localhost:8080/...");
});
