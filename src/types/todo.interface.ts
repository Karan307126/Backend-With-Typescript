import { Document, Types } from "mongoose";

export interface ITodo extends Document {
    title: string;
    description?: string;
    completed: boolean;
    user: Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
