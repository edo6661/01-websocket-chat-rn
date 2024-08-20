import "dotenv/config";
import express from "express";
import PORT from "./constants/port";
import authRoute from "./routes/auth.route";
import { connectToDb } from "./lib/mongoose/connectToDb";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import cors from "cors";

export const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  cors<cors.CorsRequest>({
    credentials: true,
  }),
);

app.use("/api/auth", authRoute);

app.get("/", (_req, res) => {
  res.json({
    test: "asdasd",
  });
});

app.listen(PORT, () => {
  connectToDb();
  console.log(`Server is running on http://localhost:${PORT}`);
});
