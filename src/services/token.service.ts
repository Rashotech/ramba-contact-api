import httpStatus from "http-status";
import Token from "../models/token.model";
import moment, { Moment } from "moment";
import jwt from "jsonwebtoken";
import ApiError from "../helpers/ApiError";
import { IToken, IAuthTokens } from "../interfaces/token.interface";
import config from "../config/constant";
import { IUserDocument } from "../interfaces/user.interface";

export default class TokenService {
  // Method that generates JWT Token
  public static generateToken(
    userId: string,
    expires: Moment,
    type: string,
    secret = config.jwtSecret
  ): string {
    try {
      const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
      };
      return jwt.sign(payload, secret);
    } catch (e) {
      console.log(e);
      throw new ApiError(httpStatus.BAD_REQUEST, "An error occured");
    }
  }

  // Method that stores token in the database
  public static async saveToken(
    token: string,
    userId: string,
    expires: Moment,
    type: string
  ): Promise<void> {
    try {
      await Token.updateOne({ user: userId, type },{
        token,
        user: userId,
        expires: expires.toDate(),
        type,
      }, { upsert: true });
    } catch (e) {
      console.log(e);
      throw new ApiError(httpStatus.BAD_REQUEST, "An error occured");
    }
  }

  //  Method that verifies JWT Token
  public static async verifyToken(
    token: string,
    type: string
  ): Promise<IToken> {
    try {
      const payload = jwt.verify(token, config.jwtSecret);
      const tokenDoc = await Token.findOne({ token, type, user: payload.sub });
      if (!tokenDoc) {
        throw new Error("Token not found");
      }
      return tokenDoc;
    } catch (e) {
      console.log(e);
      throw new ApiError(httpStatus.BAD_REQUEST, "An error occured");
    }
  }

  // Method that generates access and refresh token
  public static async generateAuthTokens(
    user: IUserDocument
  ): Promise<IAuthTokens> {
    try {
      const accessTokenExpires = moment().add(
        config.jwtAcessExpirationMinutes,
        "minutes"
      );
      const accessToken = this.generateToken(
        user._id,
        accessTokenExpires,
        "access"
      );

      const refreshTokenExpires = moment().add(
        config.jwtRefreshExpirationDays,
        "days"
      );
      const refreshToken = this.generateToken(
        user.id,
        refreshTokenExpires,
        "refresh"
      );
      await this.saveToken(
        refreshToken,
        user.id,
        refreshTokenExpires,
        "refresh"
      );

      return {
        access: {
          token: accessToken,
          expires: accessTokenExpires.toDate(),
        },
        refresh: {
          token: refreshToken,
          expires: refreshTokenExpires.toDate(),
        },
      };
    } catch (e) {
      console.log(e);
      throw new ApiError(httpStatus.BAD_REQUEST, "An error occured");
    }
  }
}
