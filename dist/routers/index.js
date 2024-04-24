"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksRouter_1 = __importDefault(require("./booksRouter"));
const authorRouter_1 = __importDefault(require("./authorRouter"));
const router = express_1.default.Router();
router
    .use("/book", booksRouter_1.default)
    .use("/author", authorRouter_1.default);
exports.default = router;
