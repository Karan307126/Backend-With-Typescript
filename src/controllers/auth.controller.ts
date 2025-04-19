import { Request, Response, NextFunction } from "express";
import { registerUser, loginUser } from "../services/auth.service";
import { HTTP_STATUS } from "../constants";

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
