import { NextFunction, Request, Response, Router } from "express";
import { userController } from "./user.controller";
import z from "zod";

const router = Router();

router.post("/register", (req: Request, res:Response, next:NextFunction) => {
    const createUserZodSchema = z.object({
        name: z.string({error: "name must be string"}).min(2, {message:"name is too short"}).max(50),
        email: z.string().min(6).max(30),
        password?: z.string(),
        phone?: z.string(),
        picture?: z.string(),
        address?: z.string(),
        isDeleted?: z.string(),
        isActive?: IsActive,
        isVerified?: z.string(),
        auths: IAuthProvider[],
        role: Role,
        booking?: Types.ObjectId[],
        guides?: Types.ObjectId[],
    })
}, userController.createUser); // akhane kono vabei createUser ke call kora jabe nah.
router.get("/all-users", userController.getAllUsers);

export const userRoutes = router;
