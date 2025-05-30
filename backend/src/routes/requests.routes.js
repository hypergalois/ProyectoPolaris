import { Router } from "express";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { rolesEnum } from "../config/tags.js";
import { getRequest, getRequests, createRequest, updateRequest, acceptRequest, rejectRequest, getRequestsByStatus } from "../controllers/requests.controllers.js";
import { authRequired } from "../middlewares/authRequired.middleware.js";

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Operations related to requests
 */

const router = Router();

// https://proyectopolaris.postman.co/workspace/My-Workspace~7ad015f7-88f4-4d09-8a04-281788145a86/collection/32885635-2ce6e9f5-68f3-4fb1-be1b-dde6318a90ed?action=share&creator=26303495

// Main routes

/**
 * @swagger
 * /api/requests:
 *   get:
 *     summary: Get a list of all requests
 *     tags:
 *       - Requests
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 status: "PENDING"
 *                 projectId: "2"
 *                 projectTitle: "Project Title"
 *                 description: "Project Description"
 *                 academicCourse: "2022"
 *                 requesterId: "3"
 *               - id: "2"
 *                 status: "ACCEPTED"
 *                 projectId: "3"
 *                 projectTitle: "Another Project"
 *                 description: "Another Description"
 *                 academicCourse: "2023"
 *                 requesterId: "4"
 *       '404':
 *         description: Requests not found
 *         content:
 *           application/json:
 *             example:
 *               message: Requests not found
 */
router.get("/requests", authRequired, getRequests);

/**
 * @swagger
 * /api/requests/{id}:
 *   get:
 *     summary: Get details of a specific request
 *     tags:
 *       - Requests
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the request to get details
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               status: "PENDING"
 *               projectId: "2"
 *               projectTitle: "Project Title"
 *               description: "Project Description"
 *               academicCourse: "2022"
 *               requesterId: "3"
 *       '404':
 *         description: Request not found
 *         content:
 *           application/json:
 *             example:
 *               message: Request not found
 */
router.get("/requests/:id", authRequired, getRequest);

/**
 * @swagger
 * /api/requests/{id}:
 *   put:
 *     summary: Update details of a specific request
 *     tags:
 *       - Requests
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the request to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             status: "ACCEPTED"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               status: "ACCEPTED"
 *               projectId: "2"
 *               projectTitle: "New Project"
 *               description: "New Project Description"
 *               academicCourse: "2023"
 *               requesterId: "3"
 *       '404':
 *         description: Request not updated
 *         content:
 *           application/json:
 *             example:
 *               message: Request not updated
 */
router.put("/requests/:id", authRequired, checkRole([rolesEnum.ADMIN]), updateRequest);

router.post("/requests", authRequired, createRequest);

// Utility routes

/**
 * @swagger
 * /api/requests/accepted:
 *   get:
 *     summary: Get a list of requests by status based on user role (ADMIN, USER, CREATOR)
 *     tags:
 *       - Requests
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       '200':
 *         description: Successful response
 *       '403':
 *         description: Forbidden
 *         content:
 *           application/json:
 *             example:
 *               message: You are not allowed.
 *       '404':
 *         description: No requests found
 *         content:
 *           application/json:
 *             example:
 *               message: No requests found
 */
router.get("/requests/status/:status", authRequired, getRequestsByStatus);

/**
 * @swagger
 * /api/requests/accept/{id}:
 *   post:
 *     summary: Accept a specific request
 *     tags:
 *       - Requests
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the request to accept
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               status: "ACCEPTED"
 *               projectId: "2"
 *               projectTitle: "New Project"
 *               description: "New Project Description"
 *               academicCourse: "2023"
 *               requesterId: "3"
 *       '404':
 *         description: Request not accepted
 *         content:
 *           application/json:
 *             example:
 *               message: Request not accepted
 */
router.post("/requests/accept/:id", authRequired, checkRole([rolesEnum.ADMIN]), acceptRequest);

/**
 * @swagger
 * /api/requests/reject/{id}:
 *   post:
 *     summary: Reject a specific request
 *     tags:
 *       - Requests
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the request to reject
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               status: "REJECTED"
 *               projectId: "2"
 *               project: {}
 *               projectTitle: "New Project"
 *               description: "New Project Description"
 *               academicCourse: "2023"
 *               requester: {}
 *               requesterId: "3"
 *       '404':
 *         description: Request not rejected
 *         content:
 *           application/json:
 *             example:
 *               message: Request not rejected
 */
router.post("/requests/reject/:id", authRequired, checkRole([rolesEnum.ADMIN]), rejectRequest);

export default router;
