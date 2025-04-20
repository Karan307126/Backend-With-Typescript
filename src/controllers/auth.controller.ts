import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { HTTP_STATUS } from "../constants";

/**
 * Handles a POST request to /register.
 *
 * The request body should contain a valid `name`, `email`, and `password`.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} A promise that resolves when the request has been handled.
 */
export const register = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const user = await registerUser(name, email, password);

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: user
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Handles a POST request to /login.
 *
 * The request body should contain a valid `email` and `password`.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} A promise that resolves when the request has been handled.
 */
export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { email, password } = req.body;
        const { user, token } = await loginUser(email, password);

        res.status(HTTP_STATUS.OK).json({
            success: true,
            token,
            data: user
        });
    } catch (error) {
        next(error);
    }
};
