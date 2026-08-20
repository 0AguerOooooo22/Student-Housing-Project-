import jwt from "jsonwebtoken";
import type { Request, Response, NextFunction } from "express";
import type { UserRole } from "../models/User";
import type { TokenPayload } from "../utils/GenerateToken";

declare global {
  namespace Express {
    interface Request {
      user?: TokenPayload;
    }
  }
}

// 1) Authintication (Auth guard)
const authc = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, no token provided",
    });
  }

  const token = authHeader.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    return res.status(500).json({
      success: false,
      message: "Server misconfiguration: JWT_SECRET is missing",
    });
  }

  try {
    const verify = jwt.verify(token, secret) as TokenPayload;
    req.user = verify;
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid or expired token",
    });
  }
};

// 2) Authorization (Role guard)
const authz = (role: String) => {
  const middleware = (req: Request, res: Response, next: NextFunction) => {
    if (req.user?.role !== role) {
      return res.status(403).json({ msg: "Access denied" });
    }

    next();
  };
  return middleware;
};
