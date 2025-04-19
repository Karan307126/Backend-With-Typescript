import jwt from "jsonwebtoken";
import User from "../models/user.model";
import ApiError from "../utils/apiError";
import { IUser } from "../types";
import { ENV } from "../config/env";
import { HTTP_STATUS } from "../constants";
import { Types } from "mongoose";

const generateToken = (id: Types.ObjectId): string => {
    return jwt.sign({ id }, ENV.ACCESS_TOKEN_SECRET, {
        expiresIn: ENV.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]
    });
};

export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<IUser> => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new ApiError("User already exists", HTTP_STATUS.BAD_REQUEST);
    }

    const user = await User.create({ name, email, password });
    return user;
};

export const loginUser = async (
    email: string,
    password: string
): Promise<{ user: IUser; token: string }> => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new ApiError("Invalid credentials", HTTP_STATUS.UNAUTHORIZED);
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new ApiError("Invalid credentials", HTTP_STATUS.UNAUTHORIZED);
    }

    const token = generateToken(user._id as Types.ObjectId);
    return { user, token };
};
