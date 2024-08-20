import bcrypt from "bcryptjs";
export const comparePassword = async (password: string, hashedPassword: string) => {
  try {
    if (!password || !hashedPassword) {
      throw new Error("Password and hashed password is required");
    }
    return await bcrypt.compare(password, hashedPassword);
  } catch (err) {
    console.error(err);
  }
};
