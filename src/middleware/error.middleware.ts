import { Request, Response, NextFunction } from "express";
import httpStatus from "http-status";
import ApiError from "../helpers/ApiError";

const errorHandler = (
  error: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let message;
  let statusCode;
  if (!(error instanceof ApiError)) {
    statusCode = error.statusCode
      ? httpStatus.BAD_REQUEST
      : httpStatus.INTERNAL_SERVER_ERROR;
    message = error.message || httpStatus[statusCode];
  } else {
    statusCode =
      error.statusCode || error.status || httpStatus.INTERNAL_SERVER_ERROR;
    message = error.message || httpStatus[statusCode];
  }

  const response = {
    success: false,
    message,
  };

  return res.status(statusCode).send(response);
};

export default errorHandler;
