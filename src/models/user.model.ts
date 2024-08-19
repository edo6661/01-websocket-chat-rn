import { UserDocument } from "@/types/user.type";
import mongoose from "mongoose";

const userSchema = new mongoose.Schema<UserDocument>({
  fullName: {
    type: String,
    required: [true, "Fullname is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  profilePicture: {
    type: String,
    default: "https://i.pinimg.com/564x/1e/13/a6/1e13a604728f5e9737b142b2efb6ed6b.jpg",
  },
});

const User = mongoose.model("User", userSchema);

export default User;
