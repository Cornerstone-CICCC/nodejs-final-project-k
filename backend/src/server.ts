import express, { Response } from "express";
import dotenv from "dotenv";
import bodyParser from "body-parser";

dotenv.config();

// Create server
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
import userRouter from "./routes/user.routes";
app.use("/api/users", userRouter);

import messageRouter from "./routes/message.routes";
app.use("/api/messages", messageRouter);

import dateMessageRouter from "./routes/date_message.routes";
app.use("/api/date-messages", dateMessageRouter);

// 404 Fallback
app.use((_, res: Response) => {
  res.status(404).send("Invalid route");
});

// Start server
app.listen(8080, () => {
  console.log("Server is running on http://localhost:8080/...");
});
