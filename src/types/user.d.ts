import mongoose from "mongoose";

export interface UserModel extends mongoose.Models {
    readonly _id: string;
    userName: string;
    email: string;
    password: string;
    accessToken: string;
    refreshToken: string;
}
