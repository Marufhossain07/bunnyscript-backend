import bcrypt from "bcrypt";
import prisma from "../utils/client";
import AppError from "../utils/AppError";

const register = async (email: string, password: string) => {
  const existingUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (existingUser) {
    throw new Error("Email already exists");
  }

  const passwordhash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordhash,
    },
    select: {
      id: true,
      email: true,
      createdAt: true,
    }
  });

  return user;
};

const login = async (email: string, password: string) => {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new AppError(401, "Invalid email or password");
  }

  const isMatch = await bcrypt.compare(password, user.passwordhash);

  if (!isMatch) {
    throw new AppError(401, "Invalid email or password");
  }

  return {
    id: user.id,
    email: user.email,
    createdAt: user.createdAt,
  };
};

export default {
  register,
  login
};