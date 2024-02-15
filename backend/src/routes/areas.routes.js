import { Router } from "express";
import { getAreas, getArea, createArea, updateArea, deleteArea } from "../controllers/areas.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { areaSchema } from "../schemas/area.schema.js";

/**
 * @swagger
 * tags:
 *   name: Areas
 *   description: Operations related to areas
 */

const router = Router();

// Main routes

/**
 * @swagger
 * /api/areas:
 *   get:
 *     summary: Get a list of all areas
 *     tags:
 *       - Areas
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: "IT"
 *                 createdAt: "2024-02-14T00:00:00Z"
 *                 degrees: []
 *               - id: "2"
 *                 name: "Computer Science"
 *                 createdAt: "2024-02-14T12:34:56Z"
 *                 degrees: []
 *       '404':
 *         description: Areas not found
 *         content:
 *           application/json:
 *             example:
 *               message: Areas not found
 */
router.get("/areas", getAreas);

/**
 * @swagger
 * /api/areas/{id}:
 *   get:
 *     summary: Get details of a specific area
 *     tags:
 *       - Areas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the area
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "IT"
 *               createdAt: "2024-02-14T00:00:00Z"
 *               degrees: []
 *       '404':
 *         description: Area not found
 *         content:
 *           application/json:
 *             example:
 *               message: Area not found
 */
router.get("/area/:id", getArea);

/**
 * @swagger
 * /api/areas:
 *   post:
 *     summary: Create a new area
 *     tags:
 *       - Areas
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: "New Area"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               name: "New Area"
 *               createdAt: "2024-02-14T12:34:56Z"
 *               degrees: []
 *       '404':
 *         description: Area not created
 *         content:
 *           application/json:
 *             example:
 *               message: Area not created
 */
router.post("/area", validateSchema(areaSchema), createArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   put:
 *     summary: Update details of a specific area
 *     tags:
 *       - Areas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the area to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Area"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               name: "Updated Area"
 *               createdAt: "2024-02-14T12:34:56Z"
 *               degrees: []
 *       '404':
 *         description: Area not updated
 *         content:
 *           application/json:
 *             example:
 *               message: Area not updated
 */
router.put("/area/:id", updateArea);

/**
 * @swagger
 * /api/areas/{id}:
 *   delete:
 *     summary: Delete a specific area
 *     tags:
 *       - Areas
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the area to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               name: "Updated Area"
 *               createdAt: "2024-02-14T12:34:56Z"
 *               degrees: []
 *       '404':
 *         description: Area not deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Area not deleted
 */
router.delete("/area/:id", deleteArea);

export default router;