import {Request, Response } from "express";
import Listing from "../models/Listing";
import InterestRequest from "../models/InterestRequest";


export const getListings = async (req: Request,res: Response): Promise<void> => {
    try {
        const { location, minPrice, maxPrice, roomsAvailable } = req.query;

        const filter: Record<string, unknown> = {};

        if (location) {
            filter.location = {
                $regex: String(location), // regex --> Regular Expression , flexible search 
                $options: "i" // case insinsitive search
            };
        }

        if (minPrice !== undefined || maxPrice !== undefined) {
            const priceFilter: Record<string, number> = {};

            if (minPrice !== undefined) {
                priceFilter.$gte = Number(minPrice); // greater than or equal
            }

            if (maxPrice !== undefined) {
                priceFilter.$lte = Number(maxPrice); // lower than or equal
            }

            filter.price = priceFilter;
        }

        if (roomsAvailable !== undefined) {
            filter.roomsAvailable = { $gte: Number(roomsAvailable) };
        }

        const listings = await Listing.find(filter).populate(
            "owner",
            "fullName email role"
        );

        res.status(200).json(listings);
    } catch {
        res.status(500).json({ message: "Failed to fetch listings." });
    }
};

export const getListingById = async (req: Request,res: Response): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.id).populate(
            "owner",
            "fullName email role"
        ); // return listing data with owner id ,fullName, email and role , without populate it will return owner id only
        
        if (!listing) {
            res.status(404).json({ message: "Listing not found." });
            return;
        }

        res.status(200).json(listing);
    } catch {
        res.status(500).json({ message: "Failed to fetch listing." });
    }
};

export const createListing = async (req: Request,res: Response): Promise<void> => {
    try {
        const listing = await Listing.create({
            ...req.body,
            owner: req.user?.userId
        });

        res.status(201).json(listing);
    } catch {
        res.status(500).json({ message: "Failed to create listing." });
    }
};

export const updateListing = async (req: Request,res: Response): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            res.status(404).json({ message: "Listing not found." });
            return;
        }
        // see if the current user is the listing owner
        if (listing.owner.toString() !== req.user?.userId) { // we convert owner to string since it's ObjectId 
            res.status(403).json({ message: "You can only edit your own listings." });
            return;
        }

        const {location,price , roomsAvailable,description} = req.body;
        
        listing.location = location;
        listing.price = price;
        listing.roomsAvailable = roomsAvailable;
        listing.description = description;

        await listing.save();

        res.status(200).json(listing);
    } catch {
        res.status(500).json({ message: "Failed to update listing." });
    }
};

export const deleteListing = async (req: Request,res: Response): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.id);

        if (!listing) {
            res.status(404).json({ message: "Listing not found." });
            return;
        }

        if (listing.owner.toString() !== req.user?.userId) {
            res.status(403).json({ message: "You can only delete your own listings." });
            return;
        }

        const activeRequest = await InterestRequest.findOne({
            listing: listing._id,
            status: { $in: ["pending", "accepted"] }
        });

        if (activeRequest) {
            res.status(400).json({
                message: "Cannot delete a listing with pending or accepted requests."
            });
            return;
        }

        await listing.deleteOne();

        res.status(200).json({ message: "Listing deleted successfully." });
    } catch {
        res.status(500).json({ message: "Failed to delete listing." });
    }
};
