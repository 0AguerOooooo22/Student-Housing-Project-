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


/**
 * @swagger
 * /api/requests/listing/{listingId}:
 *   post:
 *     tags: [Requests]
 *     summary: Send an interest request for a listing
 *     description: Only seekers can send interest requests. A seeker cannot request their own listing or send duplicate requests.
 *     parameters:
 *       - in: path
 *         name: listingId
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     responses:
 *       201:
 *         description: Interest request created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InterestRequest'
 *       400:
 *         description: Listing unavailable or user is the listing owner
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only seekers can send requests
 *       404:
 *         description: Listing not found
 *       409:
 *         description: Request already exists
 *       500:
 *         description: Failed to create request
 */
router.post(
    "/listing/:listingId",
    authc,
    authz("seeker"),
    createRequest
);


/**
 * @swagger
 * /api/requests/my:
 *   get:
 *     tags: [Requests]
 *     summary: Get my interest requests
 *     description: Returns all interest requests created by the authenticated seeker.
 *     responses:
 *       200:
 *         description: List of the seeker's requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InterestRequest'
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only seekers can access their requests
 *       500:
 *         description: Failed to fetch requests
 */
router.get("/my", authc, authz("seeker"), getMyRequests);


/**
 * @swagger
 * /api/requests/listing/{listingId}:
 *   get:
 *     tags: [Requests]
 *     summary: Get requests for a listing
 *     description: Only the owner of the listing can view its interest requests.
 *     parameters:
 *       - in: path
 *         name: listingId
 *         schema:
 *           type: string
 *         required: true
 *         description: Listing ID
 *     responses:
 *       200:
 *         description: List of interest requests
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/InterestRequest'
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only the listing owner can view requests
 *       404:
 *         description: Listing not found
 *       500:
 *         description: Failed to fetch listing requests
 */
router.get(
    "/listing/:listingId",
    authc,
    authz("lister"),
    getListingRequests
);


/**
 * @swagger
 * /api/requests/{id}:
 *   patch:
 *     tags: [Requests]
 *     summary: Accept or decline an interest request
 *     description: Only the owner of the related listing can update the request status.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Interest request ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateRequestStatus'
 *             type: object
 *             required:
 *               - status
 *             properties:
 *               status:
 *                 type: string
 *                 enum:
 *                   - accepted
 *                   - declined
 *                 example: accepted
 *     responses:
 *       200:
 *         description: Request status updated successfully
 *       400:
 *         description: Invalid status
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Only the listing owner can update the request
 *       404:
 *         description: Request not found
 *       500:
 *         description: Failed to update request
 */
router.patch(
    "/:id",
    authc,
    authz("lister"),
    updateRequestStatus
);


/**
 * @swagger
 * /api/requests/{id}/cancel:
 *   delete:
 *     tags: [Requests]
 *     summary: Cancel an interest request
 *     description: A seeker can cancel only their own pending interest requests.
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: Interest request ID
 *     responses:
 *       200:
 *         description: Request cancelled successfully
 *       400:
 *         description: Only pending requests can be cancelled
 *       401:
 *         description: Authentication required
 *       403:
 *         description: You can only cancel your own requests
 *       404:
 *         description: Request not found
 *       500:
 *         description: Failed to cancel request
 */
router.delete(
    "/:id/cancel",
    authc,
    authz("seeker"),
    cancelMyRequest
);

export default router;
