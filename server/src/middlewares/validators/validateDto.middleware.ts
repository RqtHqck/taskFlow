import { Request, Response, NextFunction } from 'express';
import { validate } from 'class-validator';
import { plainToInstance } from 'class-transformer';
import ApiError from '@errors/ApiError';
import logger from "@utils/logger";

export const validateBodyDto = (dtoClass: any, isArray = false) => {
    logger.info("Validate dto");

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        try {
            const dtoInstance = plainToInstance(dtoClass, req.body) as unknown;

            const itemsToValidate = isArray
                ? dtoInstance as InstanceType<typeof dtoClass>[]
                : [dtoInstance as InstanceType<typeof dtoClass>];

            const errors = (
                await Promise.all(
                    itemsToValidate.map((item) =>
                        validate(item, { whitelist: true, forbidNonWhitelisted: true })
                    )
                )
            ).flat();

            if (errors.length > 0) {
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

