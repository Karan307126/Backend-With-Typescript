import mongoose from "mongoose";
import { ENV } from "./env";
import { DB_NAME } from "../constants";

const MONGODB_URI = ENV.MONGODB_URI;
/**
 * Connects to the MongoDB database using the URI and database name
 * specified in the environment variables. Logs a message indicating
 * successful connection, or logs an error message and exits the process
 * if the connection fails.
 */

const connectDB = async (): Promise<void> => {
    try {
        const connect = await mongoose.connect(`${MONGODB_URI}/${DB_NAME}`);
        console.log(`MongoDB Connected: ${connect.connection.host} ⚙️`);
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1);
    }
};

export default connectDB;
