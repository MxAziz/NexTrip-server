
import express from 'express';
import { tourController } from './tour.controller';
import { checkAuth } from '../../middlewares/checkAuth';
import { Role } from '../user/user.interface';
import { validateRequest } from '../../middlewares/validateRequest';
import { createTourTypeZodSchema, createTourZodSchema, updateTourZodSchema } from './tour.validation';


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
router.get("/tour-types", tourController.getAllTourTypes);

router.post(
    "/create-tour-type",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createTourTypeZodSchema),
    tourController.createTourType
);

router.get("/tour-types/:id", tourController.getSingleTourType);

router.patch(
    "/tour-types/:id",
    checkAuth(Role.ADMIN, Role.SUPER_ADMIN),
    validateRequest(createTourTypeZodSchema),
    tourController.updateTourType
);

router.delete("/tour-types/:id", checkAuth(Role.ADMIN, Role.SUPER_ADMIN), tourController.deleteTourType);

export const TourRoutes = router