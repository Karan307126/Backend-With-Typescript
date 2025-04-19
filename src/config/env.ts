import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

export const ENV = {
    PORT: process.env.PORT || 3000,
    MONGODB_URI: process.env.MONGODB_URI || "",
    ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "",
    ACCESS_TOKEN_EXPIRY: process.env.ACCESS_TOKEN_EXPIRY || "10d",
    NODE_ENV: process.env.NODE_ENV || "development",
};
