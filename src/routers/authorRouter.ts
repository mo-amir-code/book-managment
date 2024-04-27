import express, { Router } from "express";
import { createAuthor, deleteAuthor, fetchAuthors, loginAuthor, updateAuthor } from "../controllers/authorController";
import { createAuthorMW, deleteAuthorMW, loginAuthorMW, updateAuthorMW } from "../middlewares/authorMiddleware";

const router:Router = express.Router();

router
   .post("/signup", createAuthorMW, createAuthor)
   .post("/signin", loginAuthorMW, loginAuthor)
   .patch("/", updateAuthorMW, updateAuthor)
   .delete("/", deleteAuthorMW, deleteAuthor)
   .get("/", fetchAuthors)



export default router;