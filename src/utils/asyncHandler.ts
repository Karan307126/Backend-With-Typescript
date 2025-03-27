import { Request, Response, NextFunction } from "express";
import { CODES } from "../constants";
import { errorHandler } from "./common";

export const asyncHandler =
    (
        requestHandler: (
            req: Request,
            res: Response,
            next: NextFunction
        ) => Promise<void>
    ) =>
    async (req: Request, res: Response, next: NextFunction) => {
        try {
            await requestHandler(req, res, next);
        } catch (error: unknown) {
            res.status(CODES.SERVER_ERROR).json({
                success: false,
                message: errorHandler(error)
            });
        }
    };
