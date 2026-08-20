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
    authz("lister"),
    validateListing,
    createListing
);

router.put(
    "/:id",
    authc,
    authz("lister"),
    validateListing,
    updateListing
);

router.delete(
    "/:id",
    authc,
    authz("lister"),
    deleteListing
);

export default router;
