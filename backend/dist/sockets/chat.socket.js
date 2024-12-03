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
const setupChatSocket = (io) => {
    io.on("connection", (socket) => {
        // On connect
        console.log(`User connected: ${socket.id}`);
        socket.on("sendMessage", (data) => __awaiter(void 0, void 0, void 0, function* () {
            try {
                yield message_controller_1.default.createMessage(data);
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
