import ApiError from "../helpers/ApiError";
import httpStatus from "http-status";
import { Request, Response, NextFunction } from "express";
import Joi from 'joi';

const validate =
  (schema: Joi.Schema) => (req: Request, res: Response, next: NextFunction) => {
    const { value, error } = schema.validate(req.body);

    if (error) {
      const errorMessage = error.details
        .map((details: Joi.ValidationErrorItem) => details.message)
        .join(", ");
      return next(new ApiError(httpStatus.UNPROCESSABLE_ENTITY, errorMessage));
    }
    Object.assign(req, value);

    return next();
  };

export default validate;