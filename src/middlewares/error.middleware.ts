import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import { HTTP_STATUS } from "../constants";

/**
 * A middleware function that handles errors and sends a JSON response.
 *
 * @param {Error} err - The error to be handled.
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * If the error is an instance of ApiError, it sends a JSON response with
 * the error message and the status code of the error. Otherwise, it logs the
 * error to the console and sends a JSON response with a generic error message
 * and a 500 status code.
 */
export const errorHandler = (
    err: Error,
    req: Request,
    res: Response,
    next: NextFunction
): void => {
    if (err instanceof ApiError) {
        res.status(err.statusCode).json({
            success: false,
            message: err.message
        });
    } else {
        console.error(err);
        res.status(HTTP_STATUS.SERVER_ERROR).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};
