import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        userName: {
            type: String,
            require: true,
            unique: true,
            trim: true
        },
        email: {
            type: String,
            require: [true, "Email is required!"],
            trim: true,
            unique: true
        },
        password: {
            type: String,
            required: [true, "Password is required!"]
        },
        refreshToken: {
            type: String
        }
    },
    { timestamps: true }
);

export const User = mongoose.model("User", userSchema);
