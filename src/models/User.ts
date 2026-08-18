import mongoose, { Schema, Document, Types } from "mongoose";

export type UserRole = "lister" | "seeker";

export interface IUser extends Document {
  _id: Types.ObjectId;
  fullName: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    fullName: {
      type: String,
      required: [true, "Full name is required"],
      trim: true,
      minlength: 2,
      maxlength: 100,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 8,
      select: false, // never return password by default
    },
    role: {
      type: String,
      enum: {
        values: ["lister", "seeker"],
        message: "Role must be either 'lister' or 'seeker'",
      },
      required: [true, "Role is required"],
    },
  },
  { timestamps: true }
);

export default mongoose.model<IUser>("User", userSchema);