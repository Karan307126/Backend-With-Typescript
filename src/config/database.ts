import mongoose from "mongoose";
import { ENV } from "./env";
import { DB_NAME } from "../constants";

const MONGODB_URI = ENV.MONGODB_URI;
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
