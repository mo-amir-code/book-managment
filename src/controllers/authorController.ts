import { validationResult } from "express-validator";
import { tryCatch } from "../middlewares/errors";
import ErrorHandler from "../utils/utility-class";
import Author from "../models/Author"
import Book from "../models/Book";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
dotenv.config();

const SALT_ROUND = parseInt(process.env.SALT_ROUND || "12");

export const createAuthor = tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Required field is empty", 404));
    }

    const {name, email, password} = req.body;
    
    const isAlreadyExist = await Author.findOne({email});

    if(isAlreadyExist){
        return next(new ErrorHandler("Author is already registered", 401))
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND)

    const newAuthorData = {
        name,
        email,
        password: hashedPassword
    }

    await Author.create(newAuthorData);

    return res.status(200).json({
        success: true,
        message: "Author is registered now"
    });
});

export const updateAuthor = tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter all required fields", 404))
    }

    const {authorId, name, oldName} = req.body;

    const author = await Author.findOneAndUpdate({ $or:[{ _id: authorId }, { name: oldName }] }, { name });

    if(!author){
        return next(new ErrorHandler("Enter valid author id or old name", 404))
    }

    return res.status(200).json({
        success: true,
        message: "Author updated successfully"
    })
})

export const deleteAuthor = tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter all required fields", 404))
    }

    const {authorId, name} = req.query;

    const author = await Author.findOneAndDelete({$or: [{_id: authorId}, { name:name }]});

    if(!author){
        return next(new ErrorHandler("Enter valid author name or id", 404));
    }

    await Book.deleteMany({author: author._id});

    return res.status(200).json({
        success: true,
        message: "Author deleted"
    });
})

export const fetchAuthors = tryCatch(async (req, res, next) => {
    const authors = await Author.find();

    return res.status(200).json({
        success: true,
        message: "Authors fecthed",
        data:authors
    });
})