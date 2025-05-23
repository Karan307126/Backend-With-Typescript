import { Response, NextFunction } from "express";
import {
    createTodo,
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo
} from "../services/todo.service";
import { AuthenticatedRequest } from "../middlewares/auth.middleware";
import { HTTP_STATUS } from "../constants";
import { createTodoSchema } from "../validations/todo.validators";
import { ValidationError } from "../utils";

/**
 * Handles a POST request to /todos.
 *
 * The request body should contain a valid `title` and `description`.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} A promise that resolves when the request has been handled.
 */
export const createTodoHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const parsed = createTodoSchema.safeParse(req.body);

        if (parsed.success === false) {
            const firstError = parsed.error.errors[0];
            throw new ValidationError(firstError.message);
        }
        const { title, description } = parsed.data as {
            title: string;
            description: string;
        };
        const todo = await createTodo(title, description, req.user.id);

        res.status(HTTP_STATUS.CREATED).json({
            statusCode: HTTP_STATUS.CREATED,
            success: true,
            message: "Todo created successfully",
            data: todo
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Handles a GET request to /todos.
 *
 * The request should be authenticated using Bearer authorization.
 *
 * @param {Request} req - The Express request object.
 * @param {Response} res - The Express response object.
 * @param {NextFunction} next - The Express next middleware function.
 *
 * @returns {Promise<void>} A promise that resolves when the request has been handled.
 */
export const getTodosHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todos = await getTodos(req.user.id);
        res.status(HTTP_STATUS.OK).json({
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Todos fetched successfully",
            data: todos
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Handles a GET request to /todos/:id.
 *
 * The request should be authenticated using Bearer authorization.
 *
 * @param {AuthenticatedRequest} req - The Express request object containing the authenticated user and the todo ID in the URL parameters.
 * @param {Response} res - The Express response object used to send the JSON response.
 * @param {NextFunction} next - The Express next middleware function for error handling.
 *
 * @returns {Promise<void>} A promise that resolves when the request has been handled.
 */

export const getTodoHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todo = await getTodoById(req.params.id, req.user.id);
        res.status(HTTP_STATUS.OK).json({
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Todo fetched successfully",
            data: todo
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Handles a PUT request to /todos/:id.
 *
 * The request should be authenticated using Bearer authorization.
 *
 * @param {AuthenticatedRequest} req - The Express request object containing the authenticated user and the todo ID in the URL parameters.
 * @param {Response} res - The Express response object used to send the JSON response.
 * @param {NextFunction} next - The Express next middleware function for error handling.
 *
 * @returns {Promise<void>} A promise that resolves when the request has been handled.
 */
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
            statusCode: HTTP_STATUS.OK,
            success: true,
            message: "Todo updated successfully",
            data: todo
        });
    } catch (error) {
        next(error);
    }
};

/**
 * Handles a DELETE request to /todos/:id.
 *
 * The request should be authenticated using Bearer authorization.
 *
 * @param {AuthenticatedRequest} req - The Express request object containing the authenticated user and the todo ID in the URL parameters.
 * @param {Response} res - The Express response object used to send the JSON response.
 * @param {NextFunction} next - The Express next middleware function for error handling.
 *
 * @returns {Promise<void>} A promise that resolves when the request has been handled.
 */
export const deleteTodoHandler = async (
    req: AuthenticatedRequest,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await deleteTodo(req.params.id, req.user.id);
        res.status(HTTP_STATUS.NO_CONTENT).json({
            statusCode: HTTP_STATUS.NO_CONTENT,
            success: true,
            message: "Todo deleted successfully",
            data: null
        });
    } catch (error) {
        next(error);
    }
};
