"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tryCatch = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    err.message ||= "Internal Error Occurred!";
    err.statusCode ||= 500;
    return res.status(err.statusCode).json({
        success: false,
        message: err.message
    });
};
exports.errorHandler = errorHandler;
const tryCatch = (func) => (req, res, next) => {
    return Promise.resolve(func(req, res, next)).catch(next);
};
exports.tryCatch = tryCatch;
