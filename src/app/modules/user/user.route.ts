import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";
import { validateRequest } from "../../middlewares/validateRequest";
import { createUserZodSchema, updateUserZodSchema } from "./user.validation";

const router = Router();

// api/v1/user/...
router.post("/register", validateRequest(createUserZodSchema) ,userController.createUser); // akhane kono vabei createUser ke call kora jabe nah.
router.get("/all-users",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.getAllUsers);
// router.get("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.getSingleUser)
// router.get("/me", checkAuth(...Object.values(Role)), UserControllers.getMe)
router.patch("/:id", validateRequest(updateUserZodSchema), checkAuth(...Object.values(Role)), userController.updateUser);

export const userRoutes = router;
