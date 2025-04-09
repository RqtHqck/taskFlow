// @middlewares/errorHanlder.middleware.ts
import { ExpressErrorMiddlewareInterface, Middleware } from "routing-controllers";
import { Request, Response, NextFunction } from "express";
import ApiError from "@errors/ApiError";
import logger from "@utils/logger";

@Middleware({ type: "after" })  // указываем, что это middleware после обработки маршрута
export class ErrorHandler implements ExpressErrorMiddlewareInterface {
    error(error: Error, request: Request, response: Response, next: NextFunction): void {
        if (error instanceof ApiError) {
            logger.error(`API Error in ${request.method} ${request.url}: ${error.code} - ${error.message}`);
            response.status(error.httpCode).json({
                success: false,
                error: {
                    code: error.code,
                    message: error.message,
                    details: error.details,
                },
            });
            return;
        }

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
