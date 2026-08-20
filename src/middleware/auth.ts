import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import type { UserRole } from "../models/User";

export const authc = (req: Request,res: Response,next: NextFunction) => {
    const token = req.cookies?.token;

    if (!token) {
        return res.status(401).json({ msg: "No token provided"});
    }

    try {
        const verify = jwt.verify(
            token,
            process.env.JWT_SECRET as string
        );

        if (!verify) {
            return res.status(401).json({msg: "Invalid token"});
        }

        next();
    } catch {
        return res.status(401).json({msg: "Invalid token"});
    }
};

export const authorize = (...roles: UserRole[]) => {
    return (req: Request,res: Response,next: NextFunction) => {
        const token = req.cookies?.token;
    
        if (!token) {
            return res.status(401).json({msg: "No token provided"});
        }
    
        try {
            const verify = jwt.verify(
                token,
                process.env.JWT_SECRET as string
            ) as {
                userId: string;
                role: UserRole;
            };
    
            if (!roles.includes(verify.role)) {
                return res.status(403).json({msg: "Access denied"});
            }
    
            next();
        } catch {
            return res.status(401).json({msg: "Invalid token"});
        }
    };
};
