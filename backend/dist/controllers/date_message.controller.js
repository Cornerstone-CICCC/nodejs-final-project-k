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
Object.defineProperty(exports, "__esModule", { value: true });
const date_message_model_1 = require("../models/date_message.model");
const message_model_1 = require("../models/message.model");
const queryDateMessagesFromHttp = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const m = yield (0, date_message_model_1.main)();
        const mMain = yield (0, message_model_1.main)();
        const dates = yield m.queryDateMessages();
        const messages = yield mMain.queryMessages({
            orderBy: { created_at: "asc" },
        });
        const messagesByDates = dates.map((date) => {
            return Object.assign(Object.assign({}, date), { messages: messages.filter(({ dateMessageId }) => {
                    return date.id === dateMessageId;
                }) });
        });
        res.status(200).json(messagesByDates);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error querying messages");
    }
});
const queryDateMessagesFromSocket = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const m = yield (0, date_message_model_1.main)();
        const mMain = yield (0, message_model_1.main)();
        const dates = yield m.queryDateMessages();
        const messages = yield mMain.queryMessages({
            orderBy: { created_at: "asc" },
        });
        const messagesByDates = dates.map((date) => {
            return Object.assign(Object.assign({}, date), { messages: messages.filter(({ dateMessageId }) => {
                    return date.id === dateMessageId;
                }) });
        });
        return messagesByDates;
    }
    catch (error) {
        console.error(error);
        throw new Error("Error querying messages");
    }
});
exports.default = { queryDateMessagesFromHttp, queryDateMessagesFromSocket };
