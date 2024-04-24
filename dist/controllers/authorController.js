"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAuthors = exports.deleteAuthor = exports.updateAuthor = exports.createAuthor = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../middlewares/errors");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const Author_1 = __importDefault(require("../models/Author"));
const Book_1 = __importDefault(require("../models/Book"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const SALT_ROUND = parseInt(process.env.SALT_ROUND || "12");
exports.createAuthor = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Required field is empty", 404));
    }
    const { name, email, password } = req.body;
    const isAlreadyExist = await Author_1.default.findOne({ email });
    if (isAlreadyExist) {
        return next(new utility_class_1.default("Author is already registered", 401));
    }
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUND);
    const newAuthorData = {
        name,
        email,
        password: hashedPassword
    };
    await Author_1.default.create(newAuthorData);
    return res.status(200).json({
        success: true,
        message: "Author is registered now"
    });
});
exports.updateAuthor = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Enter all required fields", 404));
    }
    const { authorId, name, oldName } = req.body;
    const author = await Author_1.default.findOneAndUpdate({ $or: [{ _id: authorId }, { name: oldName }] }, { name });
    if (!author) {
        return next(new utility_class_1.default("Enter valid author id or old name", 404));
    }
    return res.status(200).json({
        success: true,
        message: "Author updated successfully"
    });
});
exports.deleteAuthor = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Enter all required fields", 404));
    }
    const { authorId, name } = req.query;
    const author = await Author_1.default.findOneAndDelete({ $or: [{ _id: authorId }, { name: name }] });
    if (!author) {
        return next(new utility_class_1.default("Enter valid author name or id", 404));
    }
    await Book_1.default.deleteMany({ author: author._id });
    return res.status(200).json({
        success: true,
        message: "Author deleted"
    });
});
exports.fetchAuthors = (0, errors_1.tryCatch)(async (req, res, next) => {
    const authors = await Author_1.default.find();
    return res.status(200).json({
        success: true,
        message: "Authors fecthed",
        data: authors
    });
});
