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
exports.userModel = userModel;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
function userModel() {
    return __awaiter(this, void 0, void 0, function* () {
        return {
            queryUsers: (input) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user.findMany(input);
            }),
            createUser: (data) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user.create({ data });
            }),
            queryUser: (input) => __awaiter(this, void 0, void 0, function* () {
                return yield prisma.user.findUnique(input);
            }),
        };
    });
}
userModel()
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}))
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.error(e);
    yield prisma.$disconnect();
    process.exit(1);
}));
