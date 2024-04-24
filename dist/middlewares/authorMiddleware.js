"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAuthorMW = exports.updateAuthorMW = exports.createAuthorMW = void 0;
const express_validator_1 = require("express-validator");
exports.createAuthorMW = [
    (0, express_validator_1.body)('name').notEmpty().trim().escape(),
    (0, express_validator_1.body)('email').notEmpty().trim().escape(),
    (0, express_validator_1.body)('password').notEmpty().trim().escape()
];
exports.updateAuthorMW = [
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.body)('authorId').notEmpty().trim().escape(),
        (0, express_validator_1.body)('oldName').notEmpty().trim().escape()
    ]),
    (0, express_validator_1.body)('name').notEmpty().trim().escape()
];
exports.deleteAuthorMW = [
    (0, express_validator_1.oneOf)([
        (0, express_validator_1.query)('authorId').notEmpty().trim().escape(),
        (0, express_validator_1.query)('name').notEmpty().trim().escape()
    ])
];
