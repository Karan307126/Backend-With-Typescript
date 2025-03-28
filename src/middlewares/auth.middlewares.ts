import { ENV } from "../config/env";
import { CODES, MESSAGES } from "../constants";
import { User } from "../models/user.model";
import { asyncHandler } from "../utils/asyncHandler";
import { APIError } from "../utils/errorHandler";
import jwt from "jsonwebtoken";

export const isAuthenticated = asyncHandler(async (req, _, next) => {
    try {
        const token =
            req.headers.authorization?.replace("Bearer ", "") ||
            req.cookies.accessToken;

        if (!token)
            throw new APIError(CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);

        const decodedToken = jwt.verify(
            token,
            ENV.ACCESS_TOKEN_SECRET
        ) as jwt.JwtPayload;

        const user = await User.findById(decodedToken._id).select(
            "-password -refreshToken"
        );

        if (!user)
            throw new APIError(CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);

        req.user = user;
        next();
    } catch (error) {
        throw new APIError(CODES.UNAUTHORIZED, MESSAGES.UNAUTHORIZED);
    }
});
