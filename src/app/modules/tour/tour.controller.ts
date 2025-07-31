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

// const getAllTours = catchAsync(
//     async (req: Request, res: Response) => {
//         const result = await tourService.
//     }
// )

const getSingleTour = catchAsync(async (req: Request, res: Response) => {
    const slug = req.params.slug
    const result = await tourService.getSingleTour(slug);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour retrieved successfully',
        data: result,
    });
});

const deleteTour = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await tourService.deleteTour(id);
    sendResponse(res, {
        statusCode: 200,
        success: true,
        message: 'Tour deleted successfully',
        data: result,
    });
});


export const tourController = {
    createTour,
    getSingleTour,
    deleteTour,
}