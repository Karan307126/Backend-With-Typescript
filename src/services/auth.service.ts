import jwt from "jsonwebtoken";
import User from "../models/user.model";
import { IUser } from "../types";
import { ENV } from "../config/env";
import { Types } from "mongoose";
import { BadRequestError, UnauthorizedError } from "../utils";

/**
 * Generates a JSON Web Token (JWT) for a given user ID.
 *
 * The JWT is signed with the ACCESS_TOKEN_SECRET from the environment variables.
 * The expiration time is set to ACCESS_TOKEN_EXPIRY from the environment variables.
 *
 * @param {ObjectId} id - The user ID to generate the token for.
 *
 * @returns {string} The generated JWT.
 */
const generateToken = (id: Types.ObjectId): string => {
    return jwt.sign({ id }, ENV.ACCESS_TOKEN_SECRET, {
        expiresIn: ENV.ACCESS_TOKEN_EXPIRY as jwt.SignOptions["expiresIn"]
    });
};

/**
 * Registers a new user.
 *
 * @param {string} name - The user's name.
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 * @returns {Promise<IUser>} The newly created user.
 * @throws {ApiError} If a user with the given email address already exists.
 */
export const registerUser = async (
    name: string,
    email: string,
    password: string
): Promise<IUser> => {
    const userExists = await User.findOne({ email });
    if (userExists) {
        throw new BadRequestError("User already exists");
    }

    const user = await User.create({ name, email, password });
    return user;
};

/**
 * Logs in an existing user.
 *
 * @param {string} email - The user's email address.
 * @param {string} password - The user's password.
 *
 * @returns {Promise<{ user: IUser; token: string }>} The logged in user and its JSON Web Token.
 * @throws {ApiError} If the email address or password are invalid.
 */
export const loginUser = async (
    email: string,
    password: string
): Promise<{ user: IUser; token: string }> => {
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
        throw new UnauthorizedError("Invalid email or password");
    }

    const token = generateToken(user._id as Types.ObjectId);
    return { user, token };
};
