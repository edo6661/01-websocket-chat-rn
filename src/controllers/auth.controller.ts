import { hashPassword } from "@/lib/bcrypt/hashPassword";
import { generateTokenAndSetCookie } from "@/lib/jwt/token";
import { loginSchema, userSchema } from "@/lib/zod/auth.validation";
import User from "@/models/user.model";
import { RequestHandler } from "express";
import { comparePassword } from "@/lib/bcrypt/comparePassword";

const login: RequestHandler = async (req, res) => {
  try {
    const userValidated = loginSchema.safeParse({
      ...req.body,
    });
    if (!userValidated.success) {
      res.status(400).json({
        message: userValidated.error.errors,
      });
      return;
    }
    const userTryToLogin = userValidated.data;
    const userExist = await User.findOne({
      username: userTryToLogin.username,
    });
    if (!userExist) {
      res.status(400).json({
        message: "User not found",
      });
      return;
    }
    const isPasswordMatch = await comparePassword(userExist.password, userTryToLogin.password);
    if (!isPasswordMatch) {
      res.status(400).json({
        message: "Password is incorrect",
      });
      return;
    }
    generateTokenAndSetCookie(userExist._id as string, res);
    res.json({
      message: "Login success",
    });
  } catch (err) {
    console.error("Error on login", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};

const register: RequestHandler = async (req, res) => {
  try {
    const userValidated = userSchema.safeParse({
      ...req.body,
    });
    if (!userValidated.success) {
      res.status(400).json({
        message: userValidated.error.errors,
      });
      return;
    }
    const user = userValidated.data;
    const userExist = await User.findOne({
      $or: [{ username: user.username }, { email: user.email }],
    });

    if (userExist) {
      res.status(400).json({
        message: "User already exist",
      });
      return;
    }
    const hashedPassword = await hashPassword(user.password);

    const newUser = new User({
      ...user,
      password: hashedPassword,
    });

    if (!newUser) {
      res.status(400).json({
        message: "There was an error creating the user",
      });
      return;
    }

    generateTokenAndSetCookie(newUser._id as string, res);
    await newUser.save();

    res.status(201).json({
      message: `User ${newUser.username} created`,
    });
  } catch (err) {
    console.error("Error on register", err);
    res.status(500).json({
      message: "Internal server error",
    });
  }
};
const logout: RequestHandler = (_req, _res) => {};

export { login, register, logout };
