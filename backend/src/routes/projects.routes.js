import { Router } from "express";
import { createProject, deleteProject, getProject, getProjectByCategory, getProjectByDate, getProjectByStatus, getProjectByTitle, getProjectByUser, getProjects, updateProject } from "../controllers/projects.controllers.js";
import { uploadMiddleware } from "../middlewares/upload.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { projectSchema, updateProjectSchema } from "../schemas/project.schema.js";

const router = Router();

// Main routes

router.get("/projects", getProjects);

router.get("/projects/:id", getProject);

router.post("/projects", uploadMiddleware.array("files", 5), createProject);

router.put("/projects/:id", updateProject);

router.delete("/projects/:id", deleteProject);

// Searching routes

router.get("/projects/:userId", getProjectByUser);

router.get("/projects/:category", getProjectByCategory);

router.get("/projects/:keyword", getProjectByStatus);

router.get("/projects/:date", getProjectByDate);

router.get("/projects/:title", getProjectByTitle);

export default router;