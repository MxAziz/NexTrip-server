/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express"
import { envVars } from "../config/env"
import { AppError } from "../errorHelpers/AppError";

export const globalErrorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {

    const errorSources = [
      {
        // path: "isDeleted",
        // message: "cast failed",
      },
    ];

    let statusCode = 500;
    let message = `something went wrong ${err.message}`;

  // duplicate error
    if (err.code === 11000) {
      const matchedArray = err.message.match(/"([^"]*)"/);
      statusCode = 400;
      message = `${matchedArray[1]} already exists`;
    }
    // object id error / cast error
    else if (err.name === "CastError") {
      statusCode = 400;
      message = "invalid mongodb objectId. please provide a valid id";
    } else if (err.name === "ValidatorError") {
      statusCode = 400;
      const errors = Object.values(err.errors);

      errors.forEach((errorObject: any) => errorSources.push(errorObject.path({
        path: errorObject.path,
        message: errorObject.message,
      })));
      console.log(errors);
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