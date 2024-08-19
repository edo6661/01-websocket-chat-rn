import { z } from "zod";

const UserSchema = z.object({
  name: z.string().min(1).max(50),
});

export const testUserParsed = UserSchema.parse({
  name: "a",
  // name: "as",
});
