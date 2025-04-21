import { HTTP_STATUS } from "../constants";

export class ApiError extends Error {
    statusCode: number;

    /**
     * Constructor for ApiError.
     * @param {string} message - The error message.
     * @param {number} statusCode - The HTTP status code for the error.
     */
    constructor(message: string, statusCode: number) {
        super(message);
        this.statusCode = statusCode;
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * Returns an object that can be used as a JSON response to express.js
     * containing the error message and status code.
     *
     * @returns {object}
     * @property {number} statusCode - The HTTP status code for the error.
     * @property {boolean} success - Always false.
     * @property {string} message - The error message.
     * @property {null} data - Always null.
     */
    getResponse() {
        return {
            statusCode: this.statusCode,
            success: false,
            message: this.message,
            data: null
        };
    }
}

export class UnauthorizedError extends ApiError {
    /**
     * Constructs an UnauthorizedError instance.
     *
     * @param {string} [message] - An optional error message providing additional information about the unauthorized error.
     */
    constructor(message?: string) {
        super(`Unauthorized, ${message}`, HTTP_STATUS.UNAUTHORIZED);
    }
}

export class BadRequestError extends ApiError {
    /**
     * Constructs a BadRequestError instance.
     *
     * @param {string} [message] - An optional error message providing additional information about the bad request error.
     */
    constructor(message?: string) {
        super(`Bad Request, ${message}`, HTTP_STATUS.BAD_REQUEST);
    }
}

export class NotFoundError extends ApiError {
    /**
     * Constructs a NotFoundError instance.
     *
     * @param {string} [message] - An optional error message providing additional information about the not found error.
     */
    constructor(message?: string) {
        super(`Not Found, ${message}`, HTTP_STATUS.NOT_FOUND);
    }
}

export class ForbiddenError extends ApiError {
    /**
     * Constructs a ForbiddenError instance.
     *
     * @param {string} [message] - An optional error message providing additional information about the not found error.
     */
    constructor(message?: string) {
        super(`Forbidden, ${message}`, HTTP_STATUS.FORBIDDEN);
    }
}

export class ServerError extends ApiError {
    /**
     * Constructs a ServerError instance.
     *
     * @param {string} [message] - An optional error message providing additional information about the not found error.
     */
    constructor(message?: string) {
        super(`Internal Server Error, ${message}`, HTTP_STATUS.SERVER_ERROR);
    }
}

export class ConflictError extends ApiError {
    /**
     * Constructs a ConflictError instance.
     *
     * @param {string} [message] - An optional error message providing additional information about the not found error.
     */
    constructor(message?: string) {
        super(`Conflict, ${message}`, HTTP_STATUS.CONFLICT);
    }
}

export class ValidationError extends ApiError {
    /**
     * Constructs a ValidationError instance.
     *
     * @param {string} [message] - An optional error message providing additional information about the not found error.
     */
    constructor(message?: string) {
        super(`Validation Error, ${message}`, HTTP_STATUS.BAD_REQUEST);
    }
}
