import { Request, Response } from "express";
import { catchAsync } from "../../utils/catchAsync";
import { BookingService } from "./booking.service";
import { sendResponse } from "../../utils/sendResponse";
import { JwtPayload } from "jsonwebtoken";


const createBooking = catchAsync(
    async (req: Request, res: Response) => {
        const decodeToken = req.user as JwtPayload;
        const booking = await BookingService.createBooking(req.body, decodeToken.userId);
        sendResponse(res, {
            statusCode: 201,
            success: true,
            message: "Booking created successfully",
            data: booking
        })
    }
)

const getUserBookings = catchAsync(
    async (req: Request, res: Response) => {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Bookings retrieved successfully",
            data: null,
        });
    }
);
const getSingleBooking = catchAsync(
    async (req: Request, res: Response) => {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Booking retrieved successfully",
            data: null,
        });
    }
);

const getAllBookings = catchAsync(
    async (req: Request, res: Response) => {
        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Bookings retrieved successfully",
            data: {},
            // meta: {},
        });
    }
);

const updateBookingStatus = catchAsync(
    async (req: Request, res: Response) => {

        sendResponse(res, {
            statusCode: 200,
            success: true,
            message: "Booking Status Updated Successfully",
            data: null,
        });
    }
);


export const BookingController = {
    createBooking,
    getAllBookings,
    getSingleBooking,
    getUserBookings,
    updateBookingStatus,
}