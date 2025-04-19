import mongoose, { Schema } from "mongoose";
import { ITodo } from "../types";

const todoSchema = new Schema<ITodo>(
    {
        title: {
            type: String,
            required: true
        },
        description: {
            type: String
        },
        completed: {
            type: Boolean,
            default: false
        },
        user: {
            type: Schema.Types.ObjectId,
            ref: "User",
            required: true
        }
    },
    { timestamps: true }
);

const Todo = mongoose.model<ITodo>("Todo", todoSchema);
export default Todo;
