import { z } from "zod";

const envSchema = z.object({
  test: z.string(),
  NODE_ENV: z.string().default("development"),
});

const env = envSchema.parse(process.env);

export default env;
