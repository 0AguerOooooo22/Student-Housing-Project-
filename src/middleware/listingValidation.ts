import { Request, Response, NextFunction } from "express";

export const validateListing = (req: Request,res: Response,next: NextFunction): void => {
    const { location, price, roomsAvailable, description } = req.body;

    if (
        typeof location !== "string" ||
        location.trim() === "" ||
        typeof price !== "number" ||
        price <= 0 ||
        typeof roomsAvailable !== "number" ||
        roomsAvailable < 0 ||
        !Number.isInteger(roomsAvailable) ||
        typeof description !== "string" ||
        description.trim() === ""
    ) {
        res.status(400).json({
            message: "Invalid listing data."
        });
        return;
    }

    next();
};
