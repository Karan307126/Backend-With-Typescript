import { HTTP_STATUS } from "../constants";
import Todo from "../models/todo.model";
import { ITodo } from "../types";
import ApiError from "../utils/apiError";

export const createTodo = async (
    title: string,
    description: string | undefined,
    userId: string
): Promise<ITodo> => {
    const todo = await Todo.create({
        title,
        description,
        user: userId
    });
    return todo;
};

export const getTodos = async (userId: string): Promise<ITodo[]> => {
    const todos = await Todo.find({ user: userId });
    return todos;
};

export const getTodoById = async (
    id: string,
    userId: string
): Promise<ITodo | null> => {
    const todo = await Todo.findOne({ _id: id, user: userId });
    if (!todo) {
        throw new ApiError("Todo not found", HTTP_STATUS.NOT_FOUND);
    }
    return todo;
};

export const updateTodo = async (
    id: string,
    title: string,
    description: string | undefined,
    completed: boolean,
    userId: string
): Promise<ITodo | null> => {
    const todo = await Todo.findOneAndUpdate(
        { _id: id, user: userId },
        { title, description, completed },
        { new: true }
    );
    if (!todo) {
        throw new ApiError("Todo not found", HTTP_STATUS.NOT_FOUND);
    }
    return todo;
};

export const deleteTodo = async (id: string, userId: string): Promise<void> => {
    const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!todo) {
        throw new ApiError("Todo not found", HTTP_STATUS.NOT_FOUND);
    }
};
