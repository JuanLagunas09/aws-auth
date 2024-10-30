import {Request, Response, NextFunction} from "express";
import {ValidationError} from "joi";

const cleanErrorMessage = (message: string) => {
    return message.replace(/"/g, "");
} // Remove quotes from the error message

export const ValidationErrorHandler = ( // Error handler for Joi validation
    error: any,
    _req: Request,
    res: Response,
    next: NextFunction
) => {
    if (error instanceof ValidationError) {
        res.status(400).send({mesagge: cleanErrorMessage(error.details[0].message)});
    } 
    next(error)
};