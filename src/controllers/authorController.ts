import { validationResult } from "express-validator";
import { tryCatch } from "../middlewares/errors";
import ErrorHandler from "../utils/utility-class";
import Author from "../models/Author"
import Book from "../models/Book";
import bcrypt from "bcrypt"
import dotenv from "dotenv"
import jwt from "jsonwebtoken"
dotenv.config();

const SALT_ROUND = parseInt(process.env.SALT_ROUND || "12");

export const createAuthor = tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Required field is empty", 404));
    }

    const {name, email, password} = req.body;
    
    const isAlreadyExist = await Author.findOne({$or: [{email}, {name:name?.toLowerCase()}]});

    if(isAlreadyExist){
        return next(new ErrorHandler("Author is already registered", 401))
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUND);

    const newAuthorData = {
        name: name.toLowerCase(),
        email,
        password: hashedPassword
    }

    const author = await Author.create(newAuthorData);
    
    // This jwt token will be expired in 4 days
    const sessionToken = jwt.sign({userId: author._id, exp: Date.now()/1000 + (60*60*24*4)}, process.env.JWT_KEY!);
    
    author.sessionToken = sessionToken;
    await author.save()

    return res.status(200).json({
        success: true,
        message: "Author is registered now"
    });
});

export const loginAuthor = tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Required field is empty", 404));
    }

    const {email, password} = req.body;

    const author = await Author.findOne({email});

    if(!author){
        return next(new ErrorHandler("Author is not found", 404));
    }

    const isPasswordCorrect = await bcrypt.compare(password, author.password);

    if(!isPasswordCorrect){
        return next(new ErrorHandler("Email or password is incorrect", 401));
    }
    
    // This jwt token will be expired in 4 days
    const sessionToken = jwt.sign({userId: author._id, exp: Date.now()/1000 + (60*60*24*4)}, process.env.JWT_KEY!);
    
    author.sessionToken = sessionToken;
    await author.save()

    return res.status(200).json({
        success: true,
        message: `${author.name} author is logged in`
    });
});

export const updateAuthor = tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter all required fields", 404))
    }

    const {authorId, name, oldName, email} = req.body;

    const updatingData = {
        name: name?.toLowerCase() || undefined,
        email: email || undefined
    }

    const author = await Author.findOneAndUpdate({ $or:[{ _id: authorId }, { name: oldName }] }, updatingData);

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

    const author = await Author.findOneAndDelete({$or: [{_id: authorId}, { name:name?.toString().toLowerCase() }]});

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