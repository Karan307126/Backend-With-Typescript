import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import User from "../models/user.model";
import ApiError from "../utils/apiError";
import { ENV } from "../config/env";
import { HTTP_STATUS } from "../constants";

export interface AuthenticatedRequest extends Request {
    user?: any;
}

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
