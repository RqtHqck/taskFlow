import {NextFunction, Request, Response} from "express";
import ApiError from "@errors/ApiError";

export const validateId = () => {
    return async (req: Request, res: Response, next: NextFunction): Promise<void> => {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id) || id <= 0) {
            next(ApiError.badRequestError("Task Id is not valid or not provided"))
        }
        next();
    }
}