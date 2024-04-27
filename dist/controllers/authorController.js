"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchAuthors = exports.deleteAuthor = exports.updateAuthor = exports.loginAuthor = exports.createAuthor = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../middlewares/errors");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const Author_1 = __importDefault(require("../models/Author"));
const Book_1 = __importDefault(require("../models/Book"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const dotenv_1 = __importDefault(require("dotenv"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
dotenv_1.default.config();
const SALT_ROUND = parseInt(process.env.SALT_ROUND || "12");
exports.createAuthor = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Required field is empty", 404));
    }
    const { name, email, password } = req.body;
    const isAlreadyExist = await Author_1.default.findOne({ $or: [{ email }, { name: name?.toLowerCase() }] });
    if (isAlreadyExist) {
        return next(new utility_class_1.default("Author is already registered", 401));
    }
    const hashedPassword = await bcrypt_1.default.hash(password, SALT_ROUND);
    const newAuthorData = {
        name: name.toLowerCase(),
        email,
        password: hashedPassword
    };
    const author = await Author_1.default.create(newAuthorData);
    // This jwt token will be expired in 4 days
    const sessionToken = jsonwebtoken_1.default.sign({ userId: author._id, exp: Date.now() / 1000 + (60 * 60 * 24 * 4) }, process.env.JWT_KEY);
    author.sessionToken = sessionToken;
    await author.save();
    return res.status(200).json({
        success: true,
        message: "Author is registered now"
    });
});
exports.loginAuthor = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Required field is empty", 404));
    }
    const { email, password } = req.body;
    const author = await Author_1.default.findOne({ email });
    if (!author) {
        return next(new utility_class_1.default("Author is not found", 404));
    }
    const isPasswordCorrect = await bcrypt_1.default.compare(password, author.password);
    if (!isPasswordCorrect) {
        return next(new utility_class_1.default("Email or password is incorrect", 401));
    }
    // This jwt token will be expired in 4 days
    const sessionToken = jsonwebtoken_1.default.sign({ userId: author._id, exp: Date.now() / 1000 + (60 * 60 * 24 * 4) }, process.env.JWT_KEY);
    author.sessionToken = sessionToken;
    await author.save();
    return res.status(200).json({
        success: true,
        message: `${author.name} author is logged in`
    });
});
exports.updateAuthor = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Enter all required fields", 404));
    }
    const { authorId, name, oldName, email } = req.body;
    const updatingData = {
        name: name?.toLowerCase() || undefined,
        email: email || undefined
    };
    const author = await Author_1.default.findOneAndUpdate({ $or: [{ _id: authorId }, { name: oldName }] }, updatingData);
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
    const author = await Author_1.default.findOneAndDelete({ $or: [{ _id: authorId }, { name: name?.toString().toLowerCase() }] });
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
