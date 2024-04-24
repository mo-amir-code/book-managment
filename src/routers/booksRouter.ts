import express, { Router } from "express"
import { createBook, deleteBookByIdAndName, fetchAllBooks, updateBook } from "../controllers/booksController";
import { createBookMW, deleteBookByMW, fetchAllBooksMW, updateBookMW } from "../middlewares/bookMiddleware";

const router:Router = express.Router();


router
   .post("/", createBookMW, createBook)
   .get("/", fetchAllBooksMW, fetchAllBooks)
   .delete("/", deleteBookByMW, deleteBookByIdAndName)
   .patch("/", updateBookMW, updateBook)



export default router;