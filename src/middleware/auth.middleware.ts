import { NextFunction, Request, Response } from "express";
import config from "../config/config";
import jwt from "jsonwebtoken";

export interface AuthRequest extends Request {
  userId?: string;
}
interface JwtPayload {
  userId: string;
}

export default function auth(
  req: AuthRequest,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  try {
    const decoded = jwt.verify(token, config.JWT_SECRET as string) as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Invalid token",
    });
  }
}
