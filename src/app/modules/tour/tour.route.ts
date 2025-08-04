
import express from 'express';
import { tourController } from './tour.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { createTourZodSchema, updateTourZodSchema } from './tour.validation';


const router = express.Router();

/* --------------------- TOUR ROUTES ---------------------- */
// api/v1/tour/...
router.get("/", tourController.createTour);

router.post(
    "/create",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    // multerUpload.array("files"),
    validateRequest(createTourZodSchema),
    tourController.createTour
);

router.get(
    "/:slug",
    tourController.getSingleTour
);
router.patch(
    "/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    // multerUpload.array("files"),
    validateRequest(updateTourZodSchema),
    // tourController.updateTour
);

router.delete("/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), tourController.deleteTour);


/* ------------------ TOUR TYPE ROUTES -------------------- */
router.get("/tour-types/:id", tourController.getSingleTourType);

export const TourRoutes = router