import { HttpError } from 'routing-controllers';

export default class ApiError extends HttpError {
    public code: string;
    public details: string[] | null;
    public originalError?: unknown;

    constructor(
        status: number,
        message: string,
        code: string,
        details: string[] = [],
        originalError?: unknown
    ) {
        super(status, message);
        this.name = this.constructor.name;
        this.code = code;
        this.details = details.length > 0 ? details : null;
        this.originalError = originalError;

        if (originalError) {
            const safeError = originalError instanceof Error
                ? originalError
                : new Error(String(originalError));
            this.stack += `\nCaused by: ${safeError.stack}`;
        }

        Object.setPrototypeOf(this, new.target.prototype);
    }


    static validationError(message: string, details: string[] = [], originalError?: unknown) {
        return new ApiError(400, message, "VALIDATION_ERROR", details, originalError);
    }

    static databaseModelError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "Database model error.", "DATABASE_MODEL_ERROR", [], originalError);
    }

    static databaseRequestError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "Database request error.", "DATABASE_REQUEST_ERROR", [], originalError);
    }

    static notFoundError(message?: string, originalError?: unknown) {
        return new ApiError(404, message || "The requested resource was not found.", "NOT_FOUND", [], originalError);
    }

    static badRequestError(message: string, originalError?: unknown) {
        return new ApiError(400, message, "BAD_REQUEST", [], originalError);
    }

    static forbiddenError(message: string, originalError?: unknown) {
        return new ApiError(403, message, "FORBIDDEN", [], originalError);
    }

    static internalError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "An unexpected error occurred.", "INTERNAL_SERVER_ERROR", [], originalError);
    }
}
