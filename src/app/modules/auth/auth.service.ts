import bcryptjs from "bcryptjs";
import httpStatus from "http-status-codes";
import { IsActive, IUser } from "../user/user.interface";
import { User } from "../user/user.model";
import { AppError } from "../../errorHelpers/AppError";
import { createUserToken } from "../../utils/userTokens";
import { generateToken, verifyToken } from "../../utils/jwt";
import { envVars } from "../../config/env";
import { JwtPayload } from "jsonwebtoken";


const credentialsLogin = async (payload: Partial<IUser>) => {
    const { email, password } = payload;

    const isUserExist = await User.findOne({ email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "Email does not exist")
    }

    const isPasswordMatched = await bcryptjs.compare(password as string, isUserExist.password as string)

    if (!isPasswordMatched) {
        throw new AppError(httpStatus.BAD_REQUEST, "Incorrect Password")
    }
    // const jwtPayload = {
    //     userId: isUserExist._id,
    //     email: isUserExist.email,
    //     role: isUserExist.role
    // }
    // const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    // const refreshToken = generateToken(jwtPayload, envVars.JWT_REFRESH_SECRET, envVars.JWT_REFRESH_EXPIRES)

    const userTokens = createUserToken(isUserExist);

    // delete isUserExist.password;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pass, ...rest } = isUserExist.toObject();

    return {
        accessToken : userTokens.accessToken,
        refreshToken : userTokens.refreshToken,
        user: rest,
    }
}

const getNewAccessToken = async(refreshToken:string) => {
    const verifiedRefreshToken = verifyToken(refreshToken, envVars.JWT_REFRESH_SECRET) as JwtPayload;

    const isUserExist = await User.findOne({ email : verifiedRefreshToken.email })

    if (!isUserExist) {
        throw new AppError(httpStatus.BAD_REQUEST, "user does not exist")
    }

    if ( isUserExist.isActive === IsActive.BLOCKED || isUserExist.isActive === IsActive.INACTIVE) {
      throw new AppError(httpStatus.BAD_REQUEST, `user is ${isUserExist.isActive}`);
    }

    if (isUserExist.isDeleted) {
        throw new AppError(httpStatus.BAD_REQUEST, "user is deleted")
    }

    const jwtPayload = {
        userId: isUserExist._id,
        email: isUserExist.email,
        role: isUserExist.role
    }
    const accessToken = generateToken(jwtPayload, envVars.JWT_ACCESS_SECRET, envVars.JWT_ACCESS_EXPIRES)

    return {
        accessToken,
    }
}

//user - login - token (email, role, _id) - booking / payment / booking / payment cancel - token

export const AuthServices = {
    credentialsLogin,
    getNewAccessToken,
}