export default class ApiError extends Error {
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
}
