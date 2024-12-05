"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupChatSocket = void 0;
const message_controller_1 = __importDefault(require("../controllers/message.controller"));
const date_message_controller_1 = __importDefault(require("../controllers/date_message.controller"));
const directMessageChannelOnUsers_controller_1 = __importDefault(require("../controllers/directMessageChannelOnUsers.controller"));
const jwt_1 = require("../utils/jwt");
const setupChatSocket = (io) => {
    io.on("connection", (socket) => {
        // On connect
        console.log(`User connected: ${socket.id}`);
        // https://github.com/Cornerstone-CICCC/nodejs-midterm-project-kupuma-ru21/blob/master/backend/src/routes/restaurant.routes.ts
        socket.on("createDirectMessageChat", (data) => __awaiter(void 0, void 0, void 0, function* () {
            validateToken(data.token);
            const { sub } = (0, jwt_1.getSubFromToken)(data.token);
            try {
                yield directMessageChannelOnUsers_controller_1.default.createDirectMessageChannel([
                    { userId: data.userId },
                    { userId: sub },
                ]);
                io.emit("newDirectMessageChannels");
            }
            catch (error) {
                console.error(error);
            }
        }));
        socket.on("sendMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
            validateToken(data.token);
            const { sub } = (0, jwt_1.getSubFromToken)(data.token);
            try {
                yield message_controller_1.default.createMessage({ text: data.text, userId: sub });
                io.emit("newMessage", yield date_message_controller_1.default.queryDateMessagesFromSocket());
            }
            catch (error) {
                console.error(error);
            }
        }));
        // On disconnect
        socket.on("disconnect", () => {
            console.log(`User disconnected: ${socket.id}`);
        });
        console.log("------------------");
    });
};
exports.setupChatSocket = setupChatSocket;
const validateToken = (token) => {
    var _a;
    const jwtSecret = (_a = process.env.JWT_SECRET) !== null && _a !== void 0 ? _a : "";
    if (jwtSecret === "")
        throw new Error("JWT_SECRET is not defined");
    const splits = token.split(".");
    const unsignedToken = [splits[0], splits[1]].join(".");
    if ((0, jwt_1.HMAC_SHA256)(jwtSecret, unsignedToken) !== splits[2]) {
        throw new Error("Invalid token");
    }
};
