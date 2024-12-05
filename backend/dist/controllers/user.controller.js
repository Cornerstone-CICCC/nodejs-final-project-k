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
const queryUsers = (_, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const m = yield (0, user_model_1.userModel)();
        const users = yield m.queryUsers();
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
