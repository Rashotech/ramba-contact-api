import { Document, Model } from 'mongoose';
import { Request } from 'express';

export interface IUser {
    email: string;
    username: string;
    password: string;
}

export interface IUserDocument extends IUser, Document {
    isPasswordMatch: (password: string) => Promise<boolean>;
}

export interface IUserModel extends Model<IUserDocument> {
    isEmailorUsernameTaken: (username: string, email: string) => Promise<IUserDocument>;
    isUsernameTaken: (username: string) => Promise<IUserDocument>;
}

export interface AuthRequest extends Request {
    user?: string;
    params: {
        id?: string;
    }
    query: {
        searchTerm?: string;
        page?: string;
        limit?: string;
    }
}