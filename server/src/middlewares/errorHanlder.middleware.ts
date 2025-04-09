import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import ApiError from "@errors/ApiError";
import logger from "@utils/logger";

@Middleware({ type: "after" }) // после всех middleware
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Error, request: Request, response: Response, next: NextFunction): void {
        // Обработка ApiError инстансов
        if (error instanceof ApiError) {
            logger.error(`API Error in ${request.method} ${request.url}: ${error.code} - ${error.message}`);

            response.status(error.status).json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                },
            });
            return;
        }

        // Необработанные ошибки сервера
        logger.error(`Uncaught Error in ${request.method} ${request.url}: ${error.message}\n${error.stack || ""}`);

        response.status(500).json({
            success: false,
            error: {
                code: "UNCAUGHT_SERVER_ERROR",
                message: "An unexpected error occurred.",
            },
        });
    }
}