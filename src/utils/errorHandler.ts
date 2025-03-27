import { CODES, MESSAGES } from "../constants";

export class APIError extends Error {
    public statusCode: number;
    public data: null;
    public message: string;
    public success: boolean;
    public errors: Array<Error>;

    constructor(
        statusCode = CODES.SERVER_ERROR,
        message = MESSAGES.SERVER_ERROR,
        errors: Array<Error> = [],
        stack = ""
    ) {
        super(message);
        this.statusCode = statusCode;
        this.data = null;
        this.message = message;
        this.success = false;
        this.errors = errors;
        if (stack) {
            this.stack = stack;
        } else {
            Error.captureStackTrace(this, this.constructor);
        }
    }
}
