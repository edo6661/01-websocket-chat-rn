import { z } from "zod";

const envSchema = z.object({
  test: z.string(),
  NODE_ENV: z.string().default("development"),
  PORT: z.string().default("3000"),
  MONGO_DB_URI: z.string(),
  JWT_SECRET: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
