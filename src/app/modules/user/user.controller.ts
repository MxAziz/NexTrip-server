/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextFunction, Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { UserServices } from "./user.service";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";

const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const user = await UserServices.createUser(req.body);
        sendResponse(res, {
            success: true,
            statusCode: StatusCodes.OK,
            message: "All users retrieved successfully",
            data: user,
        })
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