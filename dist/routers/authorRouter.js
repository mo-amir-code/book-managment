"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorController_1 = require("../controllers/authorController");
const authorMiddleware_1 = require("../middlewares/authorMiddleware");
const router = express_1.default.Router();
router
    .post("/", authorMiddleware_1.createAuthorMW, authorController_1.createAuthor)
    .patch("/", authorMiddleware_1.updateAuthorMW, authorController_1.updateAuthor)
    .delete("/", authorMiddleware_1.deleteAuthorMW, authorController_1.deleteAuthor)
    .get("/", authorController_1.fetchAuthors);
exports.default = router;
