import dotenv from "dotenv";
dotenv.config()
import { app } from "./app";
import connectDB from "./config/database";
import { ENV } from "./config/env";

const PORT = ENV.PORT;

connectDB()
    .then(() => {
        app.on("error", (error) => {
            console.log(`Server error: ${error}`);
        });

        app.listen(PORT, () => {
            console.log(`Server started at http://localhost:${PORT} 🚀`);
        });
    })
    .catch((error) => {
        console.log("MongoDB connection Failed", error);
        process.exit(1);
    });
