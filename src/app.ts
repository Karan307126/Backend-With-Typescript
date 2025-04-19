import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import dotenv from "dotenv";
import connectDB from "./config/database";
import authRoutes from "./routes/auth.routes";
import todoRoutes from "./routes/todo.routes";
import { errorHandler } from "./middlewares/error.middleware";

dotenv.config();

const app = express();

// Connect to MongoDB
connectDB();

// Middlewares
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

// Error handling middleware
app.use(errorHandler);

export default app;
