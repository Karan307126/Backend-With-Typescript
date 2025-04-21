import { HTTP_STATUS } from "../constants";
import Todo from "../models/todo.model";
import { ITodo } from "../types";
import { NotFoundError } from "../utils";

/**
 * Creates a new Todo item.
 *
 * @param {string} title - The title of the Todo item.
 * @param {string | undefined} description - The description of the Todo item.
 * @param {string} userId - The ID of the User who created the Todo item.
 * @returns {Promise<ITodo>} The newly created Todo item.
 */
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

/**
 * Retrieves a list of Todo items for a specific user.
 *
 * @param {string} userId - The ID of the user whose Todos are to be retrieved.
 * @returns {Promise<ITodo[]>} A promise that resolves to an array of Todo items belonging to the user.
 */
export const getTodos = async (userId: string): Promise<ITodo[]> => {
    const todos = await Todo.find({ user: userId });
    if (todos.length === 0) throw new NotFoundError("No todos found");
    return todos;
};

/**
 * Retrieves a single Todo item by its ID for a specific user.
 *
 * @param {string} id - The ID of the Todo item to be retrieved.
 * @param {string} userId - The ID of the user who owns the Todo item.
 * @returns {Promise<ITodo | null>} A promise that resolves to the Todo item if found, or null if not found.
 * @throws {ApiError} If the Todo item is not found, an error is thrown with a status of 404 (Not Found).
 */
export const getTodoById = async (
    id: string,
    userId: string
): Promise<ITodo | null> => {
    const todo = await Todo.findOne({ _id: id, user: userId });
    if (!todo) {
        throw new NotFoundError("Todo not found");
    }
    return todo;
};

/**
 * Updates a Todo item.
 *
 * @param {string} id - The ID of the Todo item to be updated.
 * @param {string} title - The new title of the Todo item.
 * @param {string | undefined} description - The new description of the Todo item (optional).
 * @param {boolean} completed - The new completion status of the Todo item.
 * @param {string} userId - The ID of the user who owns the Todo item.
 * @returns {Promise<ITodo | null>} A promise that resolves to the updated Todo item if found, or null if not found.
 * @throws {ApiError} If the Todo item is not found, an error is thrown with a status of 404 (Not Found).
 */
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
        throw new NotFoundError("Todo not found");
    }
    return todo;
};

/**
 * Deletes a Todo item.
 *
 * @param {string} id - The ID of the Todo item to be deleted.
 * @param {string} userId - The ID of the user who owns the Todo item.
 * @returns {Promise<void>} A promise that resolves when the Todo item is deleted.
 * @throws {ApiError} If the Todo item is not found, an error is thrown with a status of 404 (Not Found).
 */
export const deleteTodo = async (id: string, userId: string): Promise<void> => {
    const todo = await Todo.findOneAndDelete({ _id: id, user: userId });
    if (!todo) {
        throw new NotFoundError("Todo not found");
    }
};
