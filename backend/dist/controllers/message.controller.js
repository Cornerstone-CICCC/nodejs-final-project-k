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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_model_1 = require("../models/message.model");
const dateMessageByDirectMessageChannel_model_1 = require("../models/dateMessageByDirectMessageChannel.model");
const dateMessageByChannel_model_1 = require("../models/dateMessageByChannel.model");
const formatDate_1 = require("../utils/formatDate");
const queryMessages = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const m = yield (0, message_model_1.main)();
        const messages = yield m.queryMessages();
        res.status(200).json(messages);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error querying messages");
    }
});
const createDateMessageByDirectMessageChannel = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { directMessageChannelId } = _a, rest = __rest(_a, ["directMessageChannelId"]);
    try {
        // TODO: transaction
        const dmm = yield (0, dateMessageByDirectMessageChannel_model_1.dateMessageByDirectMessageChannelModel)();
        const m = yield (0, message_model_1.main)();
        const messagesByDates = yield dmm.queryDateMessageByDirectMessageChannel({
            where: { directMessageChannelId },
        });
        const today = new Date();
        const messagesByDate = messagesByDates.find(({ created_at }) => {
            return (0, formatDate_1.isSameDate)(created_at, today);
        });
        if (messagesByDate) {
            return yield m.createMessage({
                data: Object.assign(Object.assign({}, rest), { dateMessageIdByDirectMessageChannel: messagesByDate.id }),
            });
        }
        const messagesByDateCreated = yield dmm.createDateMessageByDirectMessageChannel({
            data: { directMessageChannelId },
        });
        return yield m.createMessage({
            data: Object.assign(Object.assign({}, rest), { dateMessageIdByDirectMessageChannel: messagesByDateCreated.id }),
        });
    }
    catch (error) {
        console.error(error);
        throw new Error(JSON.stringify(error));
    }
});
const createDateMessageByChannel = (_a) => __awaiter(void 0, void 0, void 0, function* () {
    var { channelId } = _a, rest = __rest(_a, ["channelId"]);
    try {
        // TODO: transaction
        const dmm = yield (0, dateMessageByChannel_model_1.dateMessageByChannelModel)();
        const m = yield (0, message_model_1.main)();
        const messagesByDates = yield dmm.queryDateMessageByChannel({
            where: { channelId },
        });
        const today = new Date();
        const messagesByDate = messagesByDates.find(({ created_at }) => {
            return (0, formatDate_1.isSameDate)(created_at, today);
        });
        if (messagesByDate) {
            return yield m.createMessage({
                data: Object.assign(Object.assign({}, rest), { dateMessageIdByDirectMessageChannel: messagesByDate.id }),
            });
        }
        const messagesByDateCreated = yield dmm.createDateMessageByChannel({
            data: { channelId },
        });
        return yield m.createMessage({
            data: Object.assign(Object.assign({}, rest), { dateMessageIdByChannel: messagesByDateCreated.id }),
        });
    }
    catch (error) {
        console.error(error);
        throw new Error(JSON.stringify(error));
    }
});
exports.default = { queryMessages, createDateMessageByDirectMessageChannel };
