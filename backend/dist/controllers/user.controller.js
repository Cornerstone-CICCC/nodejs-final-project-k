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
const user_model_1 = require("../models/user.model");
const jwt_1 = require("../utils/jwt");
const queryUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { error, token } = (0, jwt_1.getToken)(req.headers.authorization);
    if (error) {
        res.status(401).send({ error });
        return;
    }
    const { sub } = (0, jwt_1.getSubFromToken)(token);
    try {
        const directMessageChannels = yield fetch("http://localhost:8080/api/direct-message-channels", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        const directMessageChannelsJson = yield directMessageChannels.json();
        const m = yield (0, user_model_1.userModel)();
        const users = yield m.queryUsers({
            where: {
                id: { not: sub },
                userName: {
                    notIn: directMessageChannelsJson.map((c) => {
                        return c.name;
                    }),
                },
            },
        });
        res.status(200).json(users);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error querying users");
    }
});
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const m = yield (0, user_model_1.userModel)();
        const user = yield m.createUser({ userName: req.body.userName });
        res.status(200).json(user);
    }
    catch (error) {
        console.error(error);
        res.status(500).send("Error creating user");
    }
});
exports.default = { queryUsers, createUser };
