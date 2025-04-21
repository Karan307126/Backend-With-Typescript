import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { HTTP_STATUS } from "../constants";
import {
    loginUserSchema,
    registerUserSchema
} from "../validations/auth.validators";
import { ValidationError } from "../utils";

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
        // Validate the request body
        const parsed = registerUserSchema.safeParse(req.body);
        const { name, email, password } = parsed.data as {
            name: string;
            email: string;
            password: string;
        };
        const user = await registerUser(name, email, password);

        res.status(HTTP_STATUS.CREATED).json({
            statusCode: HTTP_STATUS.CREATED,
            success: true,
            message: "User created successfully",
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
        const parsed = loginUserSchema.safeParse(req.body);

        if (parsed.success === false) {
            const firstError = parsed.error.errors[0];
            throw new ValidationError(firstError.message);
        }
        const { email, password } = parsed.data as {
            email: string;
            password: string;
        };
        const { user, token } = await loginUser(email, password);

        res.status(HTTP_STATUS.OK).json({
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "User logged in successfully",
            token,
            data: user
        });
    } catch (error) {
        next(error);
    }
};
