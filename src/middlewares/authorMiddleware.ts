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
    body('name').optional().notEmpty().trim().escape(),
    body('email').optional().notEmpty().trim().escape()
]

export const deleteAuthorMW = [
    oneOf([
        body('authorId').notEmpty().trim().escape(),
        body('name').notEmpty().trim().escape()
    ])
]