import mongoose from "mongoose";
import { ENV } from "./env";
import { DB_NAME } from "../constants";

const MONGODB_URL = ENV.MONGODB_URI;
const connectDB = async () => {
    try {
        const connect = await mongoose.connect(`${MONGODB_URL}/${DB_NAME}`);
        console.log(`/nMongoDB Connected: ${connect.connection.host} ⚙️`);
    } catch (error) {
        console.log("MongoDB Connection Error", error);
        process.exit(1);
    }
};

export default connectDB;
