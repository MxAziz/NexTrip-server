import { AppError } from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { IBooking } from "./booking.interface";
import httpStatus from 'http-status-codes';


const createBooking = async (payload: IBooking, userId: string) => {
    try {
        const user = await User.findById(userId);

        if (!user?.phone || !user.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour.");
        }
    } catch (error) {
        // throw error;
        throw new AppError(httpStatus.BAD_REQUEST, error as string);
    }
}


export const BookingService = {
    createBooking,
}