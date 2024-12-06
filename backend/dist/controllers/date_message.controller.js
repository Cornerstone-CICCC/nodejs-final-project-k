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
const dateMessageByDirectMessageChannel_model_1 = require("../models/dateMessageByDirectMessageChannel.model");
const message_model_1 = require("../models/message.model");
const user_model_1 = require("../models/user.model");
const queryDateMessageByDirectMessageChannel = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const m = yield (0, dateMessageByDirectMessageChannel_model_1.dateMessageByDirectMessageChannelModel)();
        const mMain = yield (0, message_model_1.main)();
        const dates = yield m.queryDateMessageByDirectMessageChannel({
            where: { directMessageChannelId: parseInt(req.params.id) },
        });
        const messages = yield mMain.queryMessages({
            orderBy: { created_at: "asc" },
        });
        const um = yield (0, user_model_1.userModel)();
        const messagesByDates = yield Promise.all(dates.map((date) => __awaiter(void 0, void 0, void 0, function* () {
            const messagesByDate = messages.filter(({ dateMessageIdByDirectMessageChannel }) => {
                return date.id === dateMessageIdByDirectMessageChannel;
            });
            return Object.assign(Object.assign({}, date), { messages: yield Promise.all(messagesByDate.map((_a) => __awaiter(void 0, void 0, void 0, function* () {
                    var _b;
                    var { userId } = _a, rest = __rest(_a, ["userId"]);
                    const u = yield um.queryUser({ where: { id: userId } });
                    return Object.assign(Object.assign({}, rest), { userName: (_b = u === null || u === void 0 ? void 0 : u.userName) !== null && _b !== void 0 ? _b : "not found" });
                }))) });
        })));
        res.status(200).json(messagesByDates);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error querying messages");
    }
});
exports.default = { queryDateMessageByDirectMessageChannel };
