import { ErrorRequestHandler } from "express";
import ApiError from "@errors/ApiError";
import logger from "@utils/logger";

export const ErrorHandler: ErrorRequestHandler = (error, req, res, next) => {
    if (error instanceof ApiError) {
        // ApiErrors throw
        logger.error(`API Error in ${req.method} ${req.originalUrl}: ${error.code} - ${error.message} ///Error trace: ${error.stack ? error.stack : ''}`);
        res.status(error.status).json({
            success: false,
            error: {
                code: error.code,
                message: error.message,
                details: error.details,
            },
        });
        return;
    }

    // Uncaught errors
    logger.error(`Uncaught Error in ${req.method} ${req.originalUrl}: ${error.code} - ${error.message}\\\Error trace: ${error.stack ? error.stack : ''}`);
    res.status(500).json({
        success: false,
        error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "An unexpected error occurred.",
        },
    });
    return;
};