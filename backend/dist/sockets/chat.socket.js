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
const dateMessageByDirectMessageChannel_controller_1 = __importDefault(require("../controllers/dateMessageByDirectMessageChannel.controller"));
const dateMessageByChannel_controller_1 = __importDefault(require("../controllers/dateMessageByChannel.controller"));
const directMessageChannelOnUsers_controller_1 = __importDefault(require("../controllers/directMessageChannelOnUsers.controller"));
const channel_controller_1 = __importDefault(require("../controllers/channel.controller"));
const jwt_1 = require("../utils/jwt");
const setupChatSocket = (io) => {
    io.on("connection", (socket) => {
        // On connect
        console.log(`User connected: ${socket.id}`);
        socket.on("createChannel", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const id = yield channel_controller_1.default.createChannel({
                    data: { name: data.name },
                });
                io.emit("newChannel", { id: String(id) });
            }
            catch (error) {
                console.error(error);
            }
        }));
        // https://github.com/Cornerstone-CICCC/nodejs-midterm-project-kupuma-ru21/blob/master/backend/src/routes/restaurant.routes.ts
        socket.on("createDirectMessageChannel", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { error } = (0, jwt_1.validateToken)(data.token);
            if (error) {
                console.error(error);
                return;
            }
            const { sub } = (0, jwt_1.getSubFromToken)(data.token);
            try {
                const id = yield directMessageChannelOnUsers_controller_1.default.createDirectMessageChannel([
                    { userId: data.userId },
                    { userId: sub },
                ]);
                io.emit("newDirectMessageChannel", { id: String(id) });
            }
            catch (error) {
                console.error(error);
            }
        }));
        socket.on("sendMessageFromDm", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { error } = (0, jwt_1.validateToken)(data.token);
            if (error) {
                console.error(error);
                return;
            }
            const { sub } = (0, jwt_1.getSubFromToken)(data.token);
            try {
                yield dateMessageByDirectMessageChannel_controller_1.default.createDateMessageByDirectMessageChannel({
                    text: data.text,
                    userId: sub,
                    directMessageChannelId: parseInt(data.directMessageChannelId),
                });
                io.emit("newMessageFromDm");
            }
            catch (error) {
                console.error(error);
            }
        }));
        socket.on("sendMessageFromChannel", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { error } = (0, jwt_1.validateToken)(data.token);
            if (error) {
                console.error(error);
                return;
            }
            const { sub } = (0, jwt_1.getSubFromToken)(data.token);
            try {
                yield dateMessageByChannel_controller_1.default.createDateMessageByChannel({
                    text: data.text,
                    userId: sub,
                    channelId: parseInt(data.channelId),
                });
                io.emit("newMessageFromChannel");
            }
            catch (error) {
                console.error(error);
            }
        }));
        socket.on("updateMessageFromChannel", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { error } = (0, jwt_1.validateToken)(data.token);
            if (error) {
                console.error(error);
                return;
            }
            try {
                yield dateMessageByChannel_controller_1.default.updateDateMessageByChannel({
                    text: data.text,
                    messageId: data.messageId,
                });
                io.emit("updatedMessageFromChannel");
            }
            catch (error) {
                console.error(error);
            }
        }));
        socket.on("deleteMessageFromChannel", (data) => __awaiter(void 0, void 0, void 0, function* () {
            const { error } = (0, jwt_1.validateToken)(data.token);
            if (error) {
                console.error(error);
                return;
            }
            try {
                yield dateMessageByChannel_controller_1.default.deleteDateMessageByChannel({
                    messageId: data.messageId,
                });
                io.emit("deleteMessageFromChannel");
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
