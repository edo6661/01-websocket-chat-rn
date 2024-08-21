import { verifyToken } from "@/lib/jwt/token";
import User from "@/models/user.model";
import { RequestHandler } from "express";
export const protectedRoute: RequestHandler = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({
        message: "Unauthorized, no token provided",
      });
      return;
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      res.status(401).json({
        message: "Unauthorized, invalid token",
      });
      return;
    }

    const user = await User.findById(decoded.userId);
    if (!user) {
      res.status(401).json({
        message: "Unauthorized, user not found",
      });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.error("Error on protectedRoute middleware", error);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
