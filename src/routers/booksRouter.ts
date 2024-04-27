import express, { Router } from "express"
import { createBook, deleteBookByIdAndName, fetchAllBooks, getBookById, updateBook } from "../controllers/booksController";
import { createBookMW, deleteBookByMW, fetchAllBooksMW, getBookByIdMW, updateBookMW } from "../middlewares/bookMiddleware";

const router:Router = express.Router();


router
   .post("/", createBookMW, createBook)
   .get("/", fetchAllBooksMW, fetchAllBooks)
   .get("/:bookId", getBookByIdMW, getBookById)
   .delete("/", deleteBookByMW, deleteBookByIdAndName)
   .patch("/", updateBookMW, updateBook)



export default router;