
import { NextFunction, Request, Response } from "express";

type err = {
    statusCode?: number;
    message?: string;
}

const errorMiddleware = (
  err: err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
};

export default errorMiddleware;