import { Request, Response, NextFunction } from "express";
import { IUser } from "../interfaces/user.interface";
import httpStatus from "http-status";
import AuthService from "../services/auth.service";
import TokenService from "../services/token.service";
import responseMessage from "../helpers/responseMessage";

export default class AuthController {
  // User Registration
  async register(req: Request, res: Response, next: NextFunction) {
    try {
      const userBody: IUser = req.body;
      const { email, username, password } = userBody;
      const user = await AuthService.register(username, email, password);
      const tokens = await TokenService.generateAuthTokens(user);
      return res
        .status(httpStatus.CREATED)
        .send(responseMessage("Registration successful", { tokens }));
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
      return res
        .status(httpStatus.OK)
        .send(responseMessage("Login successful", { tokens }));
    } catch (error) {
      next(error);
    }
  }

  // User logout
  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      await AuthService.logout(req.body.refreshToken);
      return res.status(httpStatus.NO_CONTENT).send(responseMessage("Logout successful"));
    } catch (error) {
      next(error);
    }
  }
}
