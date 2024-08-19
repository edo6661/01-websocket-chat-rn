import env from "@/env";
import mongoose from "mongoose";

export const connectToDb = async () => {
  try {
    await mongoose
      .connect(env.MONGO_DB_URI)
      .then(() => {
        console.log("Connected to the database");
      })
      .catch((err) => {
        console.error(err);
        throw new Error("Failed to connect to the database");
      });
  } catch (err) {
    console.error(err);
    throw new Error("Failed to connect to the database");
  }
};
