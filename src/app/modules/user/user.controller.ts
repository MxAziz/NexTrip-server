import { Request, Response } from "express";
import httpStatus from "http-status-codes";
import { UserServices } from "./user.service";

const createUser = async(req: Request, res: Response) => {
    try {
        const user = await UserServices.createUser(req.body);
        res
          .status(httpStatus.CREATED)
          .json({ message: "user created successfully", user });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        res.status(httpStatus.BAD_REQUEST).json({
            message: `something went wrong ${error.message}`
        })
    }
}


export const userController = {
    createUser
}