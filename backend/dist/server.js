"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const body_parser_1 = __importDefault(require("body-parser"));
const http_1 = require("http");
const chat_socket_1 = require("./sockets/chat.socket");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
// Create server
const app = (0, express_1.default)();
// Middleware
app.use((0, cors_1.default)({ origin: "http://localhost:3000" }));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: { origin: "http://localhost:3000", methods: ["GET", "POST"] },
});
// Routes
const user_routes_1 = __importDefault(require("./routes/user.routes"));
app.use("/api/users", user_routes_1.default);
const message_routes_1 = __importDefault(require("./routes/message.routes"));
app.use("/api/messages", message_routes_1.default);
const date_message_routes_1 = __importDefault(require("./routes/date_message.routes"));
app.use("/api/date-messages", date_message_routes_1.default);
const login_routes_1 = __importDefault(require("./routes/login.routes"));
app.use("/api/login", login_routes_1.default);
const directMessageChannelOnUsers_routes_1 = __importDefault(require("./routes/directMessageChannelOnUsers.routes"));
app.use("/api/direct-message-channels", directMessageChannelOnUsers_routes_1.default);
// 404 Fallback
app.use((_, res) => {
    res.status(404).send("Invalid route");
});
// Start server
server.listen(8080, () => {
    (0, chat_socket_1.setupChatSocket)(io);
    console.log("Server is running on http://localhost:8080/...");
});
