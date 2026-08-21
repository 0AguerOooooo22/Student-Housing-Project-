import { Router } from "express";
import {
    getListings,
    getListingById,
    createListing,
    updateListing,
    deleteListing
} from "../Controllers/listingController";
import { authc, authz } from "../middleware/auth";
import { validateListing } from "../middleware/listingValidations";

const router = Router();

/**
 * @swagger
 * /api/listings:
 *   get:
 *     tags: [Listings]
 *     summary: Get all listings
 *     description: Get all listings with optional filtering by location, price range, rooms available, and availability.
 *     parameters:
 *       - in: query
 *         name: location
 *         schema:
 *           type: string
 *         required: false
 *         description: Filter listings by location
 *
 *       - in: query
 *         name: minPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Minimum listing price
 *
 *       - in: query
 *         name: maxPrice
 *         schema:
 *           type: number
 *         required: false
 *         description: Maximum listing price
 *
 *       - in: query
 *         name: roomsAvailable
 *         schema:
 *           type: integer
 *         required: false
 *         description: Minimum number of available rooms
 *
 *       - in: query
 *         name: isAvailable
 *         schema:
 *           type: boolean
 *         required: false
 *         description: Filter listings by availability
 *
 *     responses:
 *       200:
 *         description: List of listings
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Listing'
 *       500:
 *         description: Failed to fetch listings
 */
router.get("/",authc, getListings);

/**
 * @swagger
 * /api/listings/{id}:
 *   get:
 *     tags: [Listings]
 *     summary: Get a listing by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Listing'
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Failed to fetch listing
 */
router.get("/:id",authc, getListingById);


/**
 * @swagger
 * /api/listings:
 *   post:
 *     tags: [Listings]
 *     summary: Create a new listing
 *     description: Only authenticated listers can create listings.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateListingRequest'
 *     responses:
 *       201:
 *         description: Listing created successfully
 *       400:
 *         description: Invalid listing data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only listers can create listings
 *       500:
 *         description: Failed to create listing
 */
router.post(
    "/",
    authc,
    authz("lister"),
    validateListing,
    createListing
);


/**
 * @swagger
 * /api/listings/{id}:
 *   put:
 *     tags: [Listings]
 *     summary: Update a listing
 *     description: Only the owner of the listing can update it.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreateListingRequest'
 *     responses:
 *       200:
 *         description: Listing updated successfully
 *       400:
 *         description: Invalid listing data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only the listing owner can update it
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Failed to update listing
 */
router.put(
    "/:id",
    authc,
    authz("lister"),
    validateListing,
    updateListing
);


/**
 * @swagger
 * /api/listings/{id}:
 *   delete:
 *     tags: [Listings]
 *     summary: Delete a listing
 *     description: Only the owner of the listing can delete it.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: Listing deleted successfully
 *       400:
 *         description: Cannot delete a listing with pending or accepted requests
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only the listing owner can delete it
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Failed to delete listing
 */
router.delete(
    "/:id",
    authc,
    authz("lister"),
    deleteListing
);

export default router;
