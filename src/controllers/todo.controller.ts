import { Request, Response, NextFunction } from "express";
import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} from "../services/todo.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { HTTP_STATUS } from "../constants";

export const createTodoHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, description } = req.body;
        const todo = await createTodo(title, description, req.user.id);

        res.status(HTTP_STATUS.CREATED).json({
            success: true,
            data: todo
        });
    } catch (error) {
        next(error);
    }
};

export const getTodosHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todos = await getTodos(req.user.id);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: todos
        });
    } catch (error) {
        next(error);
    }
};

export const getTodoHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todo = await getTodoById(req.params.id, req.user.id);
        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: todo
        });
    } catch (error) {
        next(error);
    }
};

export const updateTodoHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { title, description, completed } = req.body;
        const todo = await updateTodo(
            req.params.id,
            title,
            description,
            completed,
            req.user.id
        );

        res.status(HTTP_STATUS.OK).json({
            success: true,
            data: todo
        });
    } catch (error) {
        next(error);
    }
};

export const deleteTodoHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await deleteTodo(req.params.id, req.user.id);
        res.status(HTTP_STATUS.NO_CONTENT).json({
            success: true,
            data: null
        });
    } catch (error) {
        next(error);
    }
};
