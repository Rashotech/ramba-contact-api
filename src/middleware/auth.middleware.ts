import { Response, NextFunction } from 'express';
import httpStatus from 'http-status';
import TokenService from "../services/token.service";
import User from '../models/user.model';
import ApiError from '../helpers/ApiError';
import { AuthRequest } from '../interfaces/user.interface';

const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  let idToken;
  // Check Authorization header for token
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    idToken = req.headers.authorization.split("Bearer ")[1];
  } else {
    return res.status(403).json({ success: false, message: "UnAuthorized" });
  }
  try {
    // Verify and decode token
    const decodedToken = TokenService.verifyToken(idToken)

    const user = await User.findOne({ _id: decodedToken.sub }).select("_id");

    if (!user) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "UnAuthorized")
    }

    // Assign user ID to req user propery
    req.user = user._id;
    next();
  } catch (error) {
    return res.status(httpStatus.UNAUTHORIZED).json({ success: false, message: "Unauthorized" })
  }
};

export default authMiddleware;