import {Response } from "express";
import InterestRequest from "../models/InterestRequest";
import Listing from "../models/Listing";
import { AuthRequest } from "../middleware/authV2";

export const createRequest = async (req: AuthRequest,res: Response): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.listingId);

        if (!listing) {
            res.status(404).json({ message: "Listing not found." });
            return;
        }

        if (!listing.isAvailable) {
            res.status(400).json({
                message: "This listing is not available."
            });
            return;
        }

        if (listing.owner.toString() === req.user?.userId) {
            res.status(400).json({
                message: "You cannot request your own listing."
            });
            return;
        }

        const existingRequest = await InterestRequest.findOne({
            listing: listing._id,
            seeker: req.user?.userId
        });

        if (existingRequest) {
            res.status(409).json({
                message: "You already sent a request for this listing."
            });
            return;
        }

        const request = await InterestRequest.create({
            listing: listing._id,
            seeker: req.user?.userId,
            status: "pending"
        });

        res.status(201).json(request);
    } catch {
        res.status(500).json({ message: "Failed to create request." });
    }
};

export const getMyRequests = async (req: AuthRequest,res: Response): Promise<void> => {
    try {
        const requests = await InterestRequest.find({
            seeker: req.user?.userId
        }).populate("listing");

        res.status(200).json(requests);
    } catch {
        res.status(500).json({ message: "Failed to fetch requests." });
    }
};

export const getListingRequests = async (req: AuthRequest,res: Response): Promise<void> => {
    try {
        const listing = await Listing.findById(req.params.listingId);

        if (!listing) {
            res.status(404).json({ message: "Listing not found." });
            return;
        }

        if (listing.owner.toString() !== req.user?.userId) {
            res.status(403).json({ message: "You can only view requests on your listings." });
            return;
        }

        const requests = await InterestRequest.find({
            listing: listing._id
        }).populate("seeker", "fullName email");

        res.status(200).json(requests);
    } catch {
        res.status(500).json({ message: "Failed to fetch listing requests." });
    }
};

export const updateRequestStatus = async (req: AuthRequest,res: Response): Promise<void> => {
    try {
        const { status } = req.body;

        if (!["accepted", "declined"].includes(status)) {
            res.status(400).json({
                message: "Status must be accepted or declined."
            });
            return;
        }

        const request = await InterestRequest.findById(req.params.id);

        if (!request) {
            res.status(404).json({ message: "Request not found." });
            return;
        }

        const listing = await Listing.findById(request.listing);

        if (!listing || listing.owner.toString() !== req.user?.userId) {
            res.status(403).json({
                message: "Only the listing owner can update this request."
            });
            return;
        }

        request.status = status;
        await request.save();

        res.status(200).json(request);
    } catch {
        res.status(500).json({ message: "Failed to update request." });
    }
};

export const cancelMyRequest = async (req: AuthRequest,res: Response): Promise<void> => {
    try {
        const request = await InterestRequest.findById(req.params.id);

        if (!request) {
            res.status(404).json({ message: "Request not found." });
            return;
        }

        if (request.seeker.toString() !== req.user?.userId) {
            res.status(403).json({
                message: "You can only cancel your own requests."
            });
            return;
        }

        if (request.status !== "pending") {
            res.status(400).json({
                message: "Only pending requests can be cancelled."
            });
            return;
        }

        await request.deleteOne();

        res.status(200).json({
            message: "Request cancelled successfully."
        });
    } catch {
        res.status(500).json({ message: "Failed to cancel request." });
    }
};
