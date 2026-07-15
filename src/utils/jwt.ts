import jwt from "jsonwebtoken";
import config from "../config/config";
export const generateToken = (userId: string) => {
  return jwt.sign(
    {
      userId,
    },
    config.JWT_SECRET as string,
    {
      expiresIn: "7d",
    }
  );
};