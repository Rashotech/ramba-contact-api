import { Request, Response } from "express";
import httpStatus from 'http-status';

const notFoundHandler = (
  req: Request,
  res: Response
) => {
  const message = "Resource not found";
  const response = {
    success: false,
    message,
  };

  return res.status(httpStatus.NOT_FOUND).send(response);
};

export default notFoundHandler;