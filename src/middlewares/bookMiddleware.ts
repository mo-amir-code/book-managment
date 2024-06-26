import { body, oneOf, param, query } from "express-validator";

export const createBookMW = [
    body('title').notEmpty().trim().escape(),
    oneOf([
        body('authorName').notEmpty().trim().escape(),
        body('authorId').notEmpty().trim().escape()
    ]),
    body('publicationYear').notEmpty().trim().escape(),
]

export const fetchAllBooksMW = [
    oneOf(
        [
            query('authorId').notEmpty().trim().escape(),
            query('authorName').notEmpty().trim().escape(),
            query('publicationYear').notEmpty().trim().escape(),
        ]
    )
]

export const deleteBookByMW = [
    oneOf([
        body('bookId').notEmpty().trim().escape(),
        body('bookName').notEmpty().trim().escape()
    ])
]

export const getBookByIdMW = [
        param('bookId').notEmpty().trim().escape()
]

export const updateBookMW = [
    body('bookId').notEmpty().trim().escape(),
    body('title').optional().notEmpty().trim().escape(),
    body('publicationYear').optional().notEmpty().trim().escape(),
]