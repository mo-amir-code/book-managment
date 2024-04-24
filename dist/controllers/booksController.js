"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBook = exports.deleteBookByIdAndName = exports.fetchAllBooks = exports.createBook = void 0;
const express_validator_1 = require("express-validator");
const errors_1 = require("../middlewares/errors");
const utility_class_1 = __importDefault(require("../utils/utility-class"));
const Author_1 = __importDefault(require("../models/Author"));
const Book_1 = __importDefault(require("../models/Book"));
exports.createBook = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Enter all required fields", 404));
    }
    const { title, authorName, publicationYear } = req.body;
    const author = await Author_1.default.findOne({ name: authorName });
    if (!author) {
        return next(new utility_class_1.default("Author is not found", 404));
    }
    const parsedPublicationYear = parseInt(publicationYear);
    if (Number.isNaN(parsedPublicationYear)) {
        return next(new utility_class_1.default("Publication year should be a number", 401));
    }
    const isAlreadyExist = await Book_1.default.findOne({ title });
    if (isAlreadyExist) {
        return next(new utility_class_1.default("Book is already registered", 409));
    }
    const bookData = {
        title,
        author: author._id,
        publicationYear: parsedPublicationYear
    };
    await Book_1.default.create(bookData);
    return res.status(200).json({
        success: true,
        message: `${title} book added`
    });
});
exports.fetchAllBooks = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Enter atleast one required field", 404));
    }
    const { authorId, authorName, publicationYear } = req.query;
    let newAuthorId = authorId;
    if (newAuthorId) {
        const author = await Author_1.default.findById(newAuthorId);
        if (!author)
            return next(new utility_class_1.default("Enter valid author id", 404));
    }
    else if (authorName) {
        const author = await Author_1.default.findOne({ name: authorName });
        newAuthorId = author._id;
    }
    if (!newAuthorId && !publicationYear)
        return next(new utility_class_1.default("Enter required field(s)", 404));
    const books = await Book_1.default.find({ $or: [{ author: newAuthorId }, { publicationYear: publicationYear }] });
    return res.status(200).json({
        success: true,
        message: "All books fetched successfully",
        data: books
    });
});
exports.deleteBookByIdAndName = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Enter all required field", 404));
    }
    const { bookId, bookName } = req.query;
    console.log(bookName);
    const book = await Book_1.default.findOneAndDelete({ $or: [{ _id: bookId }, { title: bookName }] });
    if (!book) {
        return next(new utility_class_1.default("Enter valid book id", 404));
    }
    return res.status(200).json({
        success: true,
        message: `${book.title} has been deleted`
    });
});
exports.updateBook = (0, errors_1.tryCatch)(async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return next(new utility_class_1.default("Enter required fields", 404));
    }
    const { bookId, title, publicationYear } = req.body;
    const updatingData = {
        title,
        publicationYear
    };
    const book = await Book_1.default.findByIdAndUpdate(bookId, updatingData);
    if (!book) {
        return next(new utility_class_1.default("Book id is required", 400));
    }
    return res.status(200).json({
        success: true,
        message: "Book updated"
    });
});
