import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import ApiError from "../utils/apiError";
import { ENV } from "../config/env";
import { HTTP_STATUS } from "../constants";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

/**
 * Middleware to protect routes from unauthorized access.
 *
 * This middleware verifies the access token in the authorization header and
 * checks if it is valid. If the token is valid, it populates the req.user property
 * with the user object from the database. If the token is invalid, it throws an
 * ApiError with a status of 401 (Unauthorized) and a message of "Not authorized to
 * access this route".
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} A promise that resolves when the middleware has finished
 * executing.
 */
export const protect = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    let token: string | undefined;

    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer")
    ) {
        token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
        return next(
            new ApiError(
                "Not authorized to access this route",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
    }

    try {
        const decoded = jwt.verify(
            token,
            ENV.ACCESS_TOKEN_SECRET as string
        ) as {
            id: string;
        };
        req.user = await User.findById(decoded.id);
        next();
    } catch (error) {
        return next(
            new ApiError(
                "Not authorized to access this route",
                HTTP_STATUS.UNAUTHORIZED
            )
        );
    }
};
