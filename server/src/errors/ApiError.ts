export default class ApiError extends Error {
    public status: number;
    public code: string;
    public details: string[] | null;

    constructor(
        status: number,
        message: string,
        code: string,
        details: string[] = [],
        originalError?: unknown // Сделаем originalError типом unknown
    ) {
        super(message); // Устанавливаем сообщение ошибки
        this.name = this.constructor.name; // Указываем имя класса
        this.status = status; // HTTP-статус ошибки
        this.code = code; // Код ошибки
        this.details = details.length > 0 ? details : null; // Дополнительные детали ошибки

        // Если передана оригинальная ошибка, проверяем её тип и добавляем стек
        if (originalError) {
            const safeError = originalError instanceof Error ? originalError : new Error(String(originalError));
            this.stack += `\nCaused by: ${safeError.stack}`;
        }

        // Устанавливаем прототип для корректного наследования
        Object.setPrototypeOf(this, new.target.prototype);
    }

    // Методы для создания предопределённых типов ошибок
    static validationError(message: string, details: string[] = [], originalError?: unknown) {
        return new ApiError(400, message, "VALIDATION_ERROR", details, originalError);
    }

    static databaseModelError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "Database model error.", "DATABASE_MODEL_ERROR", [], originalError);
    }

    static databaseError(message?: string, originalError?: unknown) {
        return new ApiError(500, message || "Database request error.", "DATABASE_REQUEST_ERROR", [], originalError);
    }

    static conflictError(message?: string, originalError?: unknown) {
        return new ApiError(409, message || "Conflict error.", "CONFLICT_ERROR", [], originalError);
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
