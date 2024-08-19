import zod from "zod";

export const userSchema = zod
  .object({
    fullName: zod.string().min(2, {
      message: "Fullname is too short",
    }),
    username: zod.string(),
    password: zod.string(),
    confirmPassword: zod.string(),
    email: zod.string().email({
      message: "Invalid email",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Password does not match",
  });
