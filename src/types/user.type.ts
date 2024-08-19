import { Document } from "mongoose";

export interface User {
  fullName: string;
  username: string;
  password: string;
  profilePicture: string;
  email: string;
}

export interface UserDocument extends User, Document {}
