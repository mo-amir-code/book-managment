import express, { Router } from "express"
import booksRouter from "./booksRouter"
import authorRouter from "./authorRouter"

const router:Router = express.Router();

router
    .use("/book", booksRouter)
    .use("/author", authorRouter)
    

export default router;