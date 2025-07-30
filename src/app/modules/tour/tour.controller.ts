import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { tourService } from "./tour.service";
import { sendResponse } from "../../utils/sendResponse";

const createTour = catchAsync(
    async (req: Request, res: Response) => {
        const result = await tourService.createTour(req.body);
        sendResponse(res, {
        statusCode: 201,
        success: true,
        message: 'Tour created successfully',
        data: result,
    });
    }
)

const getAllTours = catchAsync(
    async (req: Request, res: Response) => [
        const result = await tourService
    ]
)


export const tourController = {
    createTour,

}