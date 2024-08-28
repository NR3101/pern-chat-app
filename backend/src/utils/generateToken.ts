import jwt from "jsonwebtoken";
import { Response } from "express";

const generateToken = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });

  res.cookie("jwt", token, {
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
    httpOnly: true, // prevents client JS from reading the cookie
    secure: process.env.NODE_ENV !== "development", // cookie will only be set in https
    sameSite: "strict", // cookie will only be sent in same-site requests
  });

  return token;
};

export default generateToken;
