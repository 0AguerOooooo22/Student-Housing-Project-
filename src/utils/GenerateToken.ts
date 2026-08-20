import jwt from "jsonwebtoken";
import type { SignOptions } from "jsonwebtoken";
import { Types } from "mongoose";
import type { UserRole } from "../models/User";

export interface TokenPayload {
  userId: string;
  role: UserRole;
}

export function generateToken(userId: Types.ObjectId, role: UserRole): string {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error("JWT_SECRET is not defined in environment variables");
  }

  const Payload: TokenPayload = {
    userId: userId.toString(),
    role,
  };

  const options: SignOptions = {
    expiresIn: (process.env.JWT_EXPIRES_IN || "7d") as SignOptions["expiresIn"],
  };

  return jwt.sign(Payload, secret, options);
}
