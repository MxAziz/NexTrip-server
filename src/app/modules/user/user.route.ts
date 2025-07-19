import { Router } from "express";
import { userController } from "./user.controller";

const router = Router();

router.post("/register", userController.createUser); // akhane kono vabei createUser ke call kora jabe nah.
router.get("/all-users", userController.getAllUsers);

export const userRoutes = router;
