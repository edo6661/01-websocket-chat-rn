import bcrypt from "bcryptjs";
export const hashPassword = async (password: string) => {
  try {
    if (!password) {
      throw new Error("Password is required");
    }
    return await bcrypt.hash(password, 12);
  } catch (err) {
    console.error(err);
  }
};
