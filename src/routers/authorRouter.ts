import express, { Router } from "express";
import { createAuthor, deleteAuthor, fetchAuthors, updateAuthor } from "../controllers/authorController";
import { createAuthorMW, deleteAuthorMW, updateAuthorMW } from "../middlewares/authorMiddleware";

const router:Router = express.Router();

router
   .post("/", createAuthorMW, createAuthor)
   .patch("/", updateAuthorMW, updateAuthor)
   .delete("/", deleteAuthorMW, deleteAuthor)
   .get("/", fetchAuthors)



export default router;