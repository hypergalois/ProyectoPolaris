import { Router } from "express";
import { createDegree, deleteDegree, getDegree, getDegrees, updateDegree, getDegreesNames } from "../controllers/degrees.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { degreeSchema } from "../schemas/degree.schema.js";

/**
 * @swagger
 * tags:
 *   name: Degrees
 *   description: Operations related to degrees
 */

const router = Router();

// Main routes

/**
 * @swagger
 * /api/degrees:
 *   get:
 *     summary: Get a list of all degrees
 *     tags:
 *       - Degrees
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               - id: "1"
 *                 name: "Computer Science"
 *                 areaId: "2"
 *                 area: {}
 *                 users: []
 *               - id: "2"
 *                 name: "Information Technology"
 *                 areaId: "1"
 *                 area: {}
 *                 users: []
 *       '404':
 *         description: No degrees found
 *         content:
 *           application/json:
 *             example:
 *               message: No degrees found
 */
router.get("/degrees", getDegrees);

/**
 * @swagger
 * /api/degrees:
 *   post:
 *     summary: Create a new degree
 *     tags:
 *       - Degrees
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: "New Degree"
 *             areaId: "1"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               name: "New Degree"
 *               areaId: "1"
 *               area: {}
 *               users: []
 *       '404':
 *         description: Degree not created
 *         content:
 *           application/json:
 *             example:
 *               message: Degree not created
 */
router.get("/degrees/:id", getDegree);

/**
 * @swagger
 * /api/degrees/{id}:
 *   get:
 *     summary: Get details of a specific degree
 *     tags:
 *       - Degrees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the degree to get details
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "1"
 *               name: "Computer Science"
 *               areaId: "2"
 *               area: {}
 *               users: []
 *       '404':
 *         description: Degree not found
 *         content:
 *           application/json:
 *             example:
 *               message: Degree not found
 */
router.post("/degrees", validateSchema(degreeSchema), createDegree);

/**
 * @swagger
 * /api/degrees/{id}:
 *   put:
 *     summary: Update details of a specific degree
 *     tags:
 *       - Degrees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the degree to update
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             name: "Updated Degree"
 *             areaId: "1"
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               name: "Updated Degree"
 *               areaId: "1"
 *               area: {}
 *               users: []
 *       '404':
 *         description: Degree not updated
 *         content:
 *           application/json:
 *             example:
 *               message: Degree not updated
 */
router.put("/degrees/:id", updateDegree);

/**
 * @swagger
 * /api/degrees/{id}:
 *   delete:
 *     summary: Delete a specific degree
 *     tags:
 *       - Degrees
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: ID of the degree to delete
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Successful response
 *         content:
 *           application/json:
 *             example:
 *               id: "3"
 *               name: "Updated Degree"
 *               areaId: "1"
 *               area: {}
 *               users: []
 *       '404':
 *         description: Degree not deleted
 *         content:
 *           application/json:
 *             example:
 *               message: Degree not deleted
 */
router.delete("/degrees/:id", deleteDegree);

// Utility routes

// Si pongo solo /api/degrees/names, entra en conflicto con el get por id
router.get("/degrees/names/form", getDegreesNames)

export default router;