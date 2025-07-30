
import express from 'express';
import { tourController } from './tour.controller';


const router = express.Router();

/* --------------------- TOUR ROUTES ---------------------- */
// api/v1/tour/...
router.get("/", tourController.createTour);

export const TourRoutes = router