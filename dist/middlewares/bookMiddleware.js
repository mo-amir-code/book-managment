"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookMW = exports.deleteBookByMW = exports.fetchAllBooksMW = exports.createBookMW = void 0;
const express_validator_1 = require("express-validator");
exports.createBookMW = [
    (0, express_validator_1.body)('title').notEmpty().trim().escape(),
    (0, express_validator_1.body)('authorName').notEmpty().trim().escape(),
    (0, express_validator_1.body)('publicationYear').notEmpty().trim().escape(),
];
exports.fetchAllBooksMW = [
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.query)('authorId').notEmpty().trim().escape(),
        (0, express_validator_1.query)('authorName').notEmpty().trim().escape(),
        (0, express_validator_1.query)('publicationYear').notEmpty().trim().escape(),
    ])
];
exports.deleteBookByMW = [
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.query)('bookId').notEmpty().trim().escape(),
        (0, express_validator_1.query)('bookName').notEmpty().trim().escape()
    ])
];
exports.updateBookMW = [
    (0, express_validator_1.body)('bookId').notEmpty().trim().escape(),
    (0, express_validator_1.body)('title').optional().notEmpty().trim().escape(),
    (0, express_validator_1.body)('publicationYear').optional().notEmpty().trim().escape(),
];
