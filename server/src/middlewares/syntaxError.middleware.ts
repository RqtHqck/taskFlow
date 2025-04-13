import ApiError from "@errors/ApiError";
import {Request, Response, NextFunction} from "express";

export const syntaxErrorCheck = (err:any, req:Request, res:Response, next:NextFunction) => {
    if (err instanceof SyntaxError && 'body' in err) {
        return next(ApiError.badRequestError("Request with syntax error.", err));
    }
    next(err);
}