import { Request, Response, NextFunction } from "express";
import { IUser } from '../interfaces/user.interface';
import httpStatus from 'http-status';
import AuthService from "../services/auth.service";
import TokenService from '../services/token.service';

export default class AuthController {
  // User Registration
  async register(req: Request, res: Response, next: NextFunction) {
    try {
        const userBody: IUser = req.body;
        const { email, username, password } = userBody;
        const fetcheduser = await AuthService.register(username, email, password);
        const user: Partial<IUser> = fetcheduser;
        delete user['password'];
        const tokens = await TokenService.generateAuthTokens(fetcheduser);

        return res.status(httpStatus.CREATED).send({
            message: "Registration successful",
            success: true,
            data: {
                user,
                tokens
            }
        });
      } catch (error) {
        next(error);
      }
  }

  // User Login
  async login(req: Request, res: Response, next: NextFunction) {
    try {
        const userBody: IUser = req.body;
        const { username, password } = userBody;
        const fetcheduser = await AuthService.login(username, password);
        const user: Partial<IUser> = fetcheduser;
        delete user.password;
        const tokens = await TokenService.generateAuthTokens(fetcheduser);

        return res.status(httpStatus.CREATED).send({
            message: "Login successful",
            success: true,
            data: {
                user,
                tokens
            }
        });
      } catch (error) {
        next(error);
      }
  }

  // User logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
        await AuthService.logout(req.body.refreshToken);
        return res.status(httpStatus.NO_CONTENT).send();
      } catch (error) {
        next(error);
      }
  }
}
