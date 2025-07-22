import { Router } from "express";
import { userController } from "./user.controller";
import { checkAuth } from "../../middlewares/checkAuth";
import { Role } from "./user.interface";

const router = Router();

router.post("/register", userController.createUser); // akhane kono vabei createUser ke call kora jabe nah.
router.get("/all-users",checkAuth(Role.ADMIN, Role.SUPER_ADMIN), userController.getAllUsers);

export const userRoutes = router;
