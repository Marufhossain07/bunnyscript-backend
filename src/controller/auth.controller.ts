import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validations/auth.validation";
import authService from "../services/auth.service";
import catchAsync from "../utils/catchAsyncError";
import { generateToken } from "../utils/jwt";
import AppError from "../utils/AppError";
import { AuthRequest } from "../middleware/auth.middleware";
import prisma from "../utils/client";

export const register = catchAsync(async (req: Request, res: Response) => {
  const body = registerSchema.parse(req.body);

  const user = await authService.register(
    body.firstName,
    body.lastName,
    body.email,
    body.password
  );

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: user,
  });
});

export const login = catchAsync(async (req, res) => {
  const result = loginSchema.safeParse(req.body);

  if (!result.success) {
    throw new AppError(400, result.error.issues[0].message);
  }

  const user = await authService.login(
    result.data.email,
    result.data.password
  );

  const token = generateToken(user.id);

  res.cookie("token", token, {
    httpOnly: true,
    secure: true,
    sameSite: "none",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.json({
    success: true,
    message: "Login successful",
    data: user,
  });
});

export const profile = catchAsync(async (req: AuthRequest, res) => {
  const user = await prisma.user.findUnique({
    where: {
      id: req.userId,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
      firstName: true,
      lastName: true,
    },
  });

  res.json({
    success: true,
    data: user,
  });
});

export const logout = (req: AuthRequest, res: Response) => {
  res.clearCookie("token");

  res.json({
    success: true,
    message: "Logged out",
  });
};