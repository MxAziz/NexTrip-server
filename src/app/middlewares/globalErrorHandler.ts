/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import { AppError } from "../errorHelpers/AppError";
import { handlerDuplicateError } from "../helpers/handlerDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { TErrorSources } from "../interfaces/error.types";
import { handlerZodError } from "../helpers/handlerZodError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    let errorSources: TErrorSources[] = [];
    let statusCode = 500;
    let message = `something went wrong ${err.message}`;

  // duplicate error
    if (err.code === 11000) {
      const simplifiedError = handlerDuplicateError(err);
      statusCode = simplifiedError.statusCode;
      message = simplifiedError.message
    }
    // object id error / cast error
    else if (err.name === "CastError") {
      const simplifiedError = handleCastError(err)
        statusCode = simplifiedError.statusCode;
        message = simplifiedError.message
    }
    else if (err.name === "ZodError") {
        const simplifiedError = handlerZodError(err)
        statusCode = simplifiedError.statusCode
        message = simplifiedError.message
        errorSources = simplifiedError.errorSources as TErrorSources[]
    }

    else if (err.name === "ValidatorError") {
      statusCode = 400;
      const errors = Object.values(err.errors);

      errors.forEach((errorObject: any) => errorSources.push(errorObject.path({
        path: errorObject.path,
        message: errorObject.message,
      })));
      message = "validation error occurred";
    }

    if (err instanceof AppError) {
        statusCode = err.statusCode;
        message = err.message;
    } else if (err instanceof Error) {
        statusCode = 500;
        message = err.message;
    }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
}