import { Router } from "express";
import { createRequest, deleteRequest, getRequest, getRequests, updateRequest, acceptRequest, rejectRequest } from "../controllers/requests.controller.js";

/**
 * @swagger
 * tags:
 *   name: Requests
 *   description: Operations related to requests
 */

const router = Router();

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
router.get("/requests", getRequests);

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
router.get("/requests/:id", getRequest);

/**
 * @swagger
 * /api/requests:
 *   post:
 *     summary: Create a new request
 *     tags:
 *       - Requests
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             status: "PENDING"
 *             projectId: "2"
 *             projectTitle: "New Project"
 *             description: "New Project Description"
 *             academicCourse: "2023"
 *             requesterId: "3"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               status: "PENDING"
 *               projectId: "2"
 *               projectTitle: "New Project"
 *               description: "New Project Description"
 *               academicCourse: "2023"
 *               requesterId: "3"
 *       '404':
 *         description: Error creating request
 *         content:
 *           application/json:
 *             example:
 *               message: Error creating request
 */
router.post("/requests", createRequest);

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
router.put("/requests/:id", updateRequest);

/**
 * @swagger
 * /api/requests/{id}:
 *   delete:
 *     summary: Delete a specific request
 *     tags:
 *       - Requests
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the request to delete
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
 *         description: Request not deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Request not deleted
 */
router.delete("/requests/:id", deleteRequest);

// Utility routes

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
router.post("/requests/accept/:id", acceptRequest);

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
router.post("/requests/reject/:id", rejectRequest);

export default router;