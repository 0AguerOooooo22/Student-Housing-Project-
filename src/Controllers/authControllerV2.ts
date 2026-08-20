import { Request, Response } from "express";
import bcrypt from "bcrypt";
import User from "../models/User";
import { generateToken } from "../utils/GenerateToken";

export const register = async (req: Request,res: Response): Promise<void> => {
    try {
        const { fullName, email, password, role } = req.body;

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            res.status(409).json({message: "User already exists."});
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
            role
        });

        const token = generateToken(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(201).json({
            message: "User registered successfully.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role: user.role
            }
        });
    } catch {
        res.status(500).json({
            message: "Registration failed."
        });
    }
};

export const login = async (req: Request,res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) {
            res.status(400).json({msg: "Invalid email or password"});
            return;
        }

        const isMatch = await bcrypt.compare(
            password,
            user.password
        );

        if (!isMatch) {
            res.status(400).json({msg: "Invalid email or password"});
            return;
        }

        const token = generateToken(user._id, user.role);

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000
        });

        res.status(200).json({message: "Login successful."});
    } catch {
        res.status(500).json({msg: "Server error"});
    }
};
