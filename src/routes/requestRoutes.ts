import { Router } from "express";
import {
    createRequest,
    getMyRequests,
    getListingRequests,
    updateRequestStatus,
    cancelMyRequest
} from "../controllers/requestController";
import { authc, authz } from "../middleware/auth";

const router = Router();

router.post(
    "/listing/:listingId",
    authc,
    authz("seeker"),
    createRequest
);

router.get("/my", authc, authz("seeker"), getMyRequests);

router.get(
    "/listing/:listingId",
    authc,
    authz("lister"),
    getListingRequests
);

router.patch(
    "/:id",
    authc,
    authz("lister"),
    updateRequestStatus
);

router.delete(
    "/:id/cancel",
    authc,
    authz("seeker"),
    cancelMyRequest
);

export default router;
