import { validationResult } from "express-validator";
import { tryCatch } from "../middlewares/errors";
import ErrorHandler from "../utils/utility-class";
import Author from "../models/Author";
import Book from "../models/Book";

export const createBook = tryCatch(async (req, res, next)  => { 
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter all required fields", 404));
    }

    const { title, authorName, publicationYear } = req.body;

    const author = await Author.findOne({name: authorName?.toLowerCase()});

    if(!author){  
        return next(new ErrorHandler("Author is not found", 404));
    }

    const parsedPublicationYear = parseInt(publicationYear);

    if(Number.isNaN(parsedPublicationYear)){
        return next(new ErrorHandler("Publication year should be a number", 401))
    }


    const isAlreadyExist = await Book.findOne({title: title.toLowerCase()});

    if(isAlreadyExist){
        return next(new ErrorHandler("Book is already registered", 409));
    }


    const bookData = {
        title: title?.toLowerCase(),
        author: author._id,
        publicationYear: parsedPublicationYear
    }

    await Book.create(bookData);

    return res.status(200).json({
        success: true,
        message: `${title} book added`
    })
});

export const fetchAllBooks = tryCatch(async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter atleast one required field", 404))
    }

    const { authorId, authorName, publicationYear } = req.query as { authorId: string, authorName: string, publicationYear:string };

    let newAuthorId = authorId;

    if(newAuthorId){
        const author = await Author.findById(newAuthorId);
        if(!author) return next(new ErrorHandler("Enter valid author id", 404))
    }else if(authorName){
        const author = await Author.findOne({name: authorName?.toLowerCase()});
        newAuthorId = author._id;
    }

    if(!newAuthorId && !publicationYear) return next(new ErrorHandler("Enter required field(s)", 404));

    const books = await Book.find({$or: [{ author: newAuthorId }, { publicationYear: publicationYear }]});

    return res.status(200).json({
        success: true,
        message: "All books fetched successfully",
        data: books
    })

})

export const deleteBookByIdAndName = tryCatch(async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter all required fields", 404));
    }

    const {bookId, bookName} = req.query;

    const book = await Book.findOneAndDelete({$or: [{ _id: bookId }, { title: bookName?.toString()?.toLowerCase() }]});

    if(!book){
        return next(new ErrorHandler("Enter valid book id or name", 404));
    }

    return res.status(200).json({
        success: true,
        message: `${book.title} has been deleted`
    })

});

export const getBookById = tryCatch(async (req, res, next) => {
    const errors = validationResult(req)

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter all required fields", 404));
    }

    const {bookId} = req.params;

    const book = await Book.findById(bookId);

    if(!book){
        return next(new ErrorHandler("Enter valid book id or name", 404));
    }

    return res.status(200).json({
        success: true,
        message: `${book.title} has been fetched`,
        data: book
    })

});

export const updateBook = tryCatch(async (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return next(new ErrorHandler("Enter required fields", 404));
    }

    const {bookId, title, publicationYear} = req.body;

    const updatingData = {
        title: title?.toLowerCase(),
        publicationYear
    }

    const book = await Book.findByIdAndUpdate(bookId, updatingData);

    if(!book){
        return next(new ErrorHandler("Book id is required", 400))
    }

    return res.status(200).json({
        success: true,
        message: "Book updated"
    });
})