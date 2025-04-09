import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import ApiError from '@errors/ApiError';

export const validateBodyDto = (dtoClass: any) => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dtoInstance = plainToInstance(dtoClass, req.body);
            const errors = await validate(dtoInstance, { whitelist: true, forbidNonWhitelisted: true });

            if (errors.length > 0) {
                // Разбиваем ошибки на отдельные сообщения
                const errorMessages = errors.flatMap(err =>
                    Object.values(err.constraints || []).map(constraint => `${err.property}: ${constraint}`)
                );

                return next(ApiError.validationError(
                    "Validation failed for the provided input.",
                    errorMessages
                ));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};
