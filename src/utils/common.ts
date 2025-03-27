export const errorHandler = (error: unknown) => {
    if (error instanceof Error) {
        return error.message;
    } else if (typeof error === "string") {
        return error;
    }
};
