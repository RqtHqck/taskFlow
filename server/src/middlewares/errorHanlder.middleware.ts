import { ErrorRequestHandler } from "express";
import ApiError from "@errors/ApiError";
import logger from "@utils/logger";

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ApiError) {
        logger.error(`API Error in ${req.method} ${req.originalUrl}: ${error.code} - ${error.message} ///Error trace: ${error.stack ? error.stack : ''}`);
        res.status(error.status).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                details: error.details,
            },
        });
        return; // Завершаем выполнение
    }

    // Обработка неожиданных ошибок
    logger.error(`Uncaught Error in ${req.method} ${req.originalUrl}: ${error.code} - ${error.message}\\\Error trace: ${error.stack ? error.stack : ''}`);
    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
        },
    });
    return; // Завершаем выполнение для Internal Server Error
};