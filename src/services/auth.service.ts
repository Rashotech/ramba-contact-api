import httpStatus from 'http-status';
import User from "../models/user.model";
import ApiError from '../helpers/ApiError';
import { IUserDocument, IUser } from '../interfaces/user.interface';
import Token from '../models/token.model';

export default class AuthService {

    public static async login(username: string, password: string): Promise<IUserDocument> {
            const user = await User.findOne({ username });
            if (!user || !(await user.isPasswordMatch(password))) {
                throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect credentials');
            }
            return user;
    }

    public static async register(username: string, email: string, password: string): Promise<IUserDocument> {
        const isTaken = await User.isEmailorUsernameTaken(email, username);
        if (isTaken) throw new ApiError(httpStatus.BAD_REQUEST, 'User already exists');
        
        const userBody: IUser = {
            username,
            email,
            password
        }

        const user = await User.create(userBody);
        return user;
    }

    public static async logout(refreshToken: string): Promise<void> {
        const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: "refresh" });
        if (!refreshTokenDoc) {
          throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
        }
        await refreshTokenDoc.remove();
    }
}