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
const message_model_1 = require("../models/message.model");
const date_message_model_1 = require("../models/date_message.model");
const formatDate_1 = require("../utils/formatDate");
const queryMessages = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const m = yield (0, message_model_1.main)();
        const messages = yield m.queryMessages();
        res.json(messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error querying messages");
    }
});
const createMessage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dmm = yield (0, date_message_model_1.main)();
        const m = yield (0, message_model_1.main)();
        const messagesByDates = yield dmm.queryDateMessages();
        const today = new Date();
        const messagesByDate = messagesByDates.find(({ created_at }) => {
            return (0, formatDate_1.formatDate)(created_at) === (0, formatDate_1.formatDate)(today);
        });
        if (messagesByDate) {
            const message = yield m.createMessage(Object.assign(Object.assign({}, req.body), { dateMessageId: messagesByDate.id }));
            res.json(message);
            return;
        }
        const messagesByDateCreated = yield dmm.createDateMessage();
        const message = yield m.createMessage(Object.assign(Object.assign({}, req.body), { dateMessageId: messagesByDateCreated.id }));
        res.json(message);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error creating message");
    }
});
exports.default = { queryMessages, createMessage };
