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

export const BookingController = {
    createBooking,
}