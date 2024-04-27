import { body, oneOf, query } from "express-validator";

export const createAuthorMW = [
    body('name').notEmpty().trim().escape(),
    body('email').notEmpty().trim().escape(),
    body('password').notEmpty().trim().escape()
 ]

export const loginAuthorMW = [
    body('email').notEmpty().trim().escape(),
    body('password').notEmpty().trim().escape()
 ]

export const updateAuthorMW = [
    oneOf([
        body('authorId').notEmpty().trim().escape(),
        body('oldName').notEmpty().trim().escape()
    ]),
    body('name').notEmpty().trim().escape()
]

export const deleteAuthorMW = [
    oneOf([
        query('authorId').notEmpty().trim().escape(),
        query('name').notEmpty().trim().escape()
    ])
]