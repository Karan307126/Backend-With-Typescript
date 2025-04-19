import { Request, Response, NextFunction } from "express";
import ApiError from "../utils/apiError";
import { HTTP_STATUS } from "../constants";

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
