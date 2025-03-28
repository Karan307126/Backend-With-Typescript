import jwt, { SignOptions } from "jsonwebtoken";
import { ENV } from "../config/env";
import { UserModel } from "../types/user";

export const errorHandler = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === "string") {
        return error;
    }
};

export const generateAccessToken = (user: UserModel) => {
    const accessToken = ENV.ACCESS_TOKEN_EXPIRY as SignOptions["expiresIn"];
    return jwt.sign(
        { _id: user._id, userName: user.userName, email: user.email },
        ENV.ACCESS_TOKEN_SECRET,
        {
            expiresIn: accessToken
        }
    );
};

export const generateRefreshToken = (user: UserModel) => {
    const refreshToken = ENV.REFRESH_TOKEN_EXPIRY as SignOptions["expiresIn"];
    return jwt.sign({ _id: user._id }, ENV.REFRESH_TOKEN_SECRET, {
        expiresIn: refreshToken
    });
};
