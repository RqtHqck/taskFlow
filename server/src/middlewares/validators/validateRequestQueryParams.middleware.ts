import Joi from "joi";
import { NextFunction, Request, Response } from "express";
import ApiError from "@errors/ApiError";
import {IGetAllRequestFilter} from "@entities/interfaces";


const getAllRequestSchema = Joi.object({
    date: Joi.date().iso().max('now').optional(),
    dateFrom: Joi.date().iso().optional(),
    dateTo: Joi.date().iso().greater(Joi.ref('dateFrom')).max('now').optional(),
})

export const validateRequestQueryParams = () => {

    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        
        const filter: IGetAllRequestFilter = req.query;
        const allowedKeys = ['date', 'dateFrom', 'dateTo'];
        const unknownKeys = Object.keys(filter).filter(key => !allowedKeys.includes(key));

        if (unknownKeys.length > 0) {
            throw ApiError.validationError(`Unknown query parameters: ${unknownKeys.join(', ')}`);
        }

        const result = getAllRequestSchema.validate(filter);
        if (result.error) {
            const errorsStringArray = result.error.details.map(item => (item.message))
            next(ApiError.validationError("Wrong request query parameters.", errorsStringArray, result.error))
        }

        const hasDate = !!filter.date;
        const hasDateFrom = !!filter.dateFrom;
        const hasDateTo = !!filter.dateTo;

        if (hasDate && (hasDateFrom || hasDateTo)) {
            throw ApiError.validationError("Use either 'date' or 'dateFrom' + 'dateTo', not both.");
        }

        if ((hasDateFrom && !hasDateTo) || (!hasDateFrom && hasDateTo)) {
            throw ApiError.validationError("'dateFrom' and 'dateTo' must be provided together.");
        }
        
        next()
    }
}