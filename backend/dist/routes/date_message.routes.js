"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const dateMessageByDirectMessageChannel_controller_1 = __importDefault(require("../controllers/dateMessageByDirectMessageChannel.controller"));
const messageRouter = (0, express_1.Router)();
messageRouter.get("/:id", dateMessageByDirectMessageChannel_controller_1.default.queryDateMessageByDirectMessageChannel);
exports.default = messageRouter;
