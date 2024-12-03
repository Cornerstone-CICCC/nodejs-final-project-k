"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const date_message_controller_1 = __importDefault(require("../controllers/date_message.controller"));
const messageRouter = (0, express_1.Router)();
messageRouter.get("/", date_message_controller_1.default.queryDateMessages);
exports.default = messageRouter;
