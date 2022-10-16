import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../helpers/ApiError";

const errorHandler = (
    error: ApiError,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const statusCode = error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR;
    const message = error.message || httpStatus[statusCode];
    const response = {
        success: false,
        message,
    };

    return res.status(statusCode).send(response);
};

export default errorHandler;
