import app from "./app";
import dotenv from "dotenv";
import { ENV } from "./config/env";

dotenv.config();

const PORT = ENV.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server running in ${ENV.NODE_ENV} mode on port ${PORT}`);
});
