/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import { AppError } from "../errorHelpers/AppError";
import { handlerDuplicateError } from "../helpers/handlerDuplicateError";
import { handleCastError } from "../helpers/handleCastError";
import { TErrorSources } from "../interfaces/error.types";
import { handlerZodError } from "../helpers/handlerZodError";
import { handlerValidationError } from "../helpers/handlerValidationError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    if (envVars.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.log(err);
    }

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
    //Mongoose Validation Error
    else if (err.name === "ValidationError") {
       const simplifiedError = handlerValidationError(err)
        statusCode = simplifiedError.statusCode;
        errorSources = simplifiedError.errorSources as TErrorSources[]
        message = simplifiedError.message
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
    err: envVars.NODE_ENV === "development" ? err : null,
    stack: envVars.NODE_ENV === "development" ? err.stack : null,
  });
}