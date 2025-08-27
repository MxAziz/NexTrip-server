import { AppError } from "../../errorHelpers/AppError";
import { User } from "../user/user.model";
import { BOOKING_STATUS, IBooking } from "./booking.interface";
import httpStatus from 'http-status-codes';
import { Booking } from "./booking.model";
import { Payment } from "../payment/payment.model";
import { PAYMENT_STATUS } from "../payment/payment.interface";
import { getTransactionId } from "../../utils/getTransactionId";
import { Tour } from "../tour/tour.model";


const createBooking = async (payload: Partial<IBooking>, userId: string) => {
    try {
        const transactionId = getTransactionId();

        const user = await User.findById(userId);

        if (!user?.phone || !user.address) {
            throw new AppError(httpStatus.BAD_REQUEST, "Please Update Your Profile to Book a Tour.");
        }

        const tour = await Tour.findById(payload.tour).select("costFrom")

        if (!tour?.costFrom) {
            throw new AppError(httpStatus.BAD_REQUEST, "No Tour cost available!");
        }

        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        const amount = Number(tour.costFrom) * Number(payload.guestCount!);

        const booking = await Booking.create({
            user: userId,
            status: BOOKING_STATUS.PENDING,
            ...payload
        })

        const payment = await Payment.create({
            booking: booking._id,
            status: PAYMENT_STATUS.UNPAID,
            transactionId: transactionId,
            amount: amount,
        })

        const updatedBooking = await Booking.findByIdAndUpdate(booking._id, { payment: payment._id }, { new: true, runValidators: true });

        return updatedBooking;

    } catch (error) {
        // throw error;
        throw new AppError(httpStatus.BAD_REQUEST, error as string);
    }
}


export const BookingService = {
    createBooking,
}