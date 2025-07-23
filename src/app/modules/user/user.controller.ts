/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "user created successfully",
            data: user,
        })
  }
);


const updateUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
        const userId = req.params.id;
        const token = req.headers.authorization;
        const verifiedToken = verifyToken(token as string, envVars.JWT_ACCESS_SECRET) as JwtPayload;
        const payload = req.body;

        const user = await UserServices.updateUser(userId, payload, verifiedToken);

        sendResponse(res, {
          success: true,
          statusCode: StatusCodes.OK,
          message: "user updated successfully",
          data: user,
        });
  }
);

const getAllUsers = catchAsync(
    async (req: Request, res: Response, next: NextFunction) => {
        const result = await UserServices.getAllUsers();

        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "All users retrieved successfully",
            data: result.data,
            meta: result.meta,
        })
  }
)


export const userController = {
    createUser,
    getAllUsers,
}