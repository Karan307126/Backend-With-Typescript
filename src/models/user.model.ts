import mongoose from "mongoose";
import bcrypt from "bcrypt";

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

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) {
        this.password = await bcrypt.hash(this.password, 16);
    }
    next();
});

userSchema.methods.comparePassword = async function (password: string) {
    return await bcrypt.compare(this.password, password);
};

export const User = mongoose.model("User", userSchema);
