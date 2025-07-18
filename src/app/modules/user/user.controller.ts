import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await UserServices.createUser(req.body);
        res
          .status(httpStatus.CREATED)
          .json({ message: "user created successfully", user });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        // eslint-disable-next-line no-console
        console.log(error);
        next(error)
    }
}


export const userController = {
    createUser
}