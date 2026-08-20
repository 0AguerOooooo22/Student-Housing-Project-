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

router.get("/",authc, getListings);

router.get("/:id",authc, getListingById);

router.post(
    "/",
    authc,
    authz("Lister"),
    validateListing,
    createListing
);

router.put(
    "/:id",
    authc,
    authz("Lister"),
    validateListing,
    updateListing
);

router.delete(
    "/:id",
    authc,
    authz("Lister"),
    deleteListing
);

export default router;
