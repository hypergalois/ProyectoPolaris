import { Router } from "express";
import {
	createProject,
	deleteProject,
	getProject,
	getProjectByCategory,
	getProjectByDate,
	getProjectByStatus,
	getProjectByTitle,
	getProjectByUser,
	getProjects,
	getProjectsHome,
	updateProject,
	getProjectsHomeByArea,
} from "../controllers/projects.controllers.js";
import { uploadFile } from "../middlewares/uploadFile.middleware.js";
import { authRequired } from "../middlewares/authRequired.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { rolesEnum } from "../config/tags.js";
import { projectSchema, updateProjectSchema } from "../schemas/project.schema.js";

const router = Router();

// https://proyectopolaris.postman.co/workspace/My-Workspace~7ad015f7-88f4-4d09-8a04-281788145a86/collection/26303495-849890db-35f0-4f1a-a592-f8545c65c919?action=share&creator=26303495

// Main routes

/**
 * @swagger
 * /projects:
 *   get:
 *     summary: Retrieve all projects
 *     description: Retrieve a list of all projects.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects", authRequired, getProjects);

/**
 * @swagger
 * /projects/home:
 *   get:
 *     summary: Retrieve home projects
 *     description: Retrieve a list of home projects.
 *     tags:
 *       - Projects
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of home projects.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProjectHome'
 *       404:
 *         description: No home projects found.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects/home", authRequired, getProjectsHome);

router.get("/projects/home/:area", authRequired, getProjectsHomeByArea);

/**
 * @swagger
 * /projects/{id}:
 *   get:
 *     summary: Retrieve a project by ID
 *     description: Retrieve a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The requested project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects/:id", authRequired, getProject);

/**
 * @swagger
 * /projects:
 *   post:
 *     summary: Create a new project
 *     description: Create a new project.
 *     tags:
 *       - Projects
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               files:
 *                 type: array
 *                 items:
 *                   type: string
 *               impliedStudentsIDs:
 *                 type: array
 *                 items:
 *                   type: string
 *               impliedTeachersIDs:
 *                 type: array
 *                 items:
 *                   type: string
 *               externalLinks:
 *                 type: array
 *                 items:
 *                   type: string
 *               keywords:
 *                 type: array
 *                 items:
 *                   type: string
 *               awards:
 *                 type: array
 *                 items:
 *                   type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The newly created project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       403:
 *         description: You are not allowed to create a project.
 *       404:
 *         description: Project or request not created.
 *       500:
 *         description: Internal server error.
 */

// validateSchema(projectSchema), authRequired
router.post("/projects", authRequired, uploadFile.array("files", 5), createProject);

/**
 * @swagger
 * /projects/{id}:
 *   put:
 *     summary: Update a project by ID
 *     description: Update a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to update.
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UpdateProjectInput'
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The updated project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       403:
 *         description: You are not allowed to update the project.
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Internal server error.
 */

router.put("/projects/:id", authRequired, validateSchema(updateProjectSchema), updateProject);

// router.put("/projects/:id", authRequired, validateSchema(updateProjectSchema), pinProject);

// router.put("/projects/:id", authRequired, validateSchema(updateProjectSchema), unpinProject);

/**
 * @swagger
 * /projects/{id}:
 *   delete:
 *     summary: Delete a project by ID
 *     description: Delete a project by its ID.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID of the project to delete.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: The deleted project.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       403:
 *         description: You are not allowed to delete the project.
 *       404:
 *         description: Project not found.
 *       500:
 *         description: Internal server error.
 */

router.delete("/projects/:id", authRequired, checkRole([rolesEnum.ADMIN]), deleteProject);

// Searching routes

/**
 * @swagger
 * /projects/user/{userId}:
 *   get:
 *     summary: Get projects by user ID
 *     description: Retrieve projects associated with a specific user.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         description: ID of the user to retrieve projects for.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects associated with the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found for the user.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects/user/:userId", authRequired, getProjectByUser);

/**
 * @swagger
 * /projects/category/{category}:
 *   get:
 *     summary: Get projects by category
 *     description: Retrieve projects based on a specific category.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: category
 *         required: true
 *         description: Category of the projects to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects in the specified category.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found for the specified category.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects/category/:category", authRequired, getProjectByCategory);

/**
 * @swagger
 * /projects/keyword/{keyword}:
 *   get:
 *     summary: Get projects by keyword
 *     description: Retrieve projects based on a specific keyword.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: keyword
 *         required: true
 *         description: Keyword of the projects to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects with the specified keyword.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found for the specified keyword.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects/keyword/:keyword", authRequired, getProjectByStatus);

/**
 * @swagger
 * /projects/date/{date}:
 *   get:
 *     summary: Get projects by date
 *     description: Retrieve projects based on a specific date.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: date
 *         required: true
 *         description: "Date of the projects to retrieve (format: YYYY-MM-DD)."
 *         schema:
 *           type: string
 *           format: date
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects with the specified date.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found for the specified date.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects/date/:date", authRequired, getProjectByDate);

/**
 * @swagger
 * /projects/title/{title}:
 *   get:
 *     summary: Get projects by title
 *     description: Retrieve projects based on a specific title.
 *     tags:
 *       - Projects
 *     parameters:
 *       - in: path
 *         name: title
 *         required: true
 *         description: Title of the projects to retrieve.
 *         schema:
 *           type: string
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of projects with the specified title.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       404:
 *         description: No projects found for the specified title.
 *       500:
 *         description: Internal server error.
 */

router.get("/projects/title/:title", authRequired, getProjectByTitle);

export default router;
