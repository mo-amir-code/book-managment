"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booksController_1 = require("../controllers/booksController");
const bookMiddleware_1 = require("../middlewares/bookMiddleware");
const router = express_1.default.Router();
router
    .post("/", bookMiddleware_1.createBookMW, booksController_1.createBook)
    .get("/", bookMiddleware_1.fetchAllBooksMW, booksController_1.fetchAllBooks)
    .delete("/", bookMiddleware_1.deleteBookByMW, booksController_1.deleteBookByIdAndName)
    .patch("/", bookMiddleware_1.updateBookMW, booksController_1.updateBook);
exports.default = router;
