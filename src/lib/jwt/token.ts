import env from "@/env";
import { Response } from "express";
import jwt from "jsonwebtoken";

export const generateTokenAndSetCookie = (userId: string, res: Response) => {
  const token = jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: "15d",
  });
  res.cookie("jwt", token, {
    httpOnly: true, // XSS
    maxAge: 15 * 24 * 60 * 60 * 1000, // 15 days
    sameSite: "strict", // csrf
  });
};
