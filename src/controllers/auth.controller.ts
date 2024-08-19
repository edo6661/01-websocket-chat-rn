import { userSchema } from "@/lib/zod/auth.validation";
import User from "@/models/user.model";
import { RequestHandler } from "express";

const login: RequestHandler = (_req, res) => {
  res.json({
    message: "login",
  });
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

    const newUser = new User({
      ...user,
    });

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
const logout: RequestHandler = (_req, res) => {
  res.json({
    message: "logout",
  });
};

export { login, register, logout };
