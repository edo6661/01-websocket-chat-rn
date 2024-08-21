import { UserDocument } from "@/types/user.type";

// ! overwrite Request interface from express-serve-static-core

declare module "express-serve-static-core" {
  interface Request {
    user?: UserDocument;
  }
}
