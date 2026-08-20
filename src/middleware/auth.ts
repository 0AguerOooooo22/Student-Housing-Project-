import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../models/User";

export interface AuthRequest extends Request {
    user?: {
        userId: string;
        role: UserRole;
    };
}

export const authc = (req: AuthRequest,res: Response,next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ msg: "No token provided"});
    }

    try {
        const verify = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        )as {
            userId: string;
            role: UserRole;
        };

        if (!verify) {
            return res.status(401).json({msg: "Invalid token"});
        }
        
        req.user = verify;
        next();
    } catch {
        return res.status(401).json({msg: "Invalid token"});
    }
};

export const authorize = (...roles: UserRole[]) => {
    return (req: AuthRequest,res: Response,next: NextFunction) => {

       if (!req.user) {
            res.status(401).json({
                msg: "Authentication required"
            });
            return;
        }
    
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({msg: "Access denied"});
        }
    
        next();

    };
};
