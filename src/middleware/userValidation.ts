import { Request, Response, NextFunction } from "express";

export const validateRegister = (req: Request,res: Response,next: NextFunction): void => {
    const { fullName, email, password, role } = req.body;

    if (
        typeof fullName !== "string" ||
        fullName.trim() === "" ||
        typeof email !== "string" ||
        email.trim() === "" ||
        typeof password !== "string" ||
        password.trim() === "" ||
        !["lister", "seeker"].includes(role)
    ) {
        res.status(400).json({message: "All required fields must be provided."});
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
        res.status(400).json({message: "Invalid email format."});
        return;
    }

    if (password.length < 8) {
        res.status(400).json({message: "Password must be at least 8 characters."});
        return;
    }

    next();
};
