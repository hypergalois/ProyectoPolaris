import { Router } from "express";
import { createProject, deleteProject, getProject, getProjectByCategory, getProjectByDate, getProjectByStatus, getProjectByTitle, getProjectByUser, getProjects, updateProject } from "../controllers/projects.controllers.js";
import { uploadFile } from "../middlewares/uploadFile.middleware.js";
import { authRequired } from "../middlewares/authRequired.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { projectSchema, updateProjectSchema } from "../schemas/project.schema.js";

const router = Router();

// Main routes
// TODO: Poner authRequired a todas las rutas cuando esté más avanzado el proyecto

router.get("/projects", getProjects);

router.get("/projects/:id", getProject);

router.post("/projects", validateSchema(projectSchema), uploadFile.array("files", 5), createProject);

router.put("/projects/:id", validateSchema(updateProjectSchema), updateProject);

router.delete("/projects/:id", deleteProject);

// Searching routes

router.get("/projects/:userId", getProjectByUser);

router.get("/projects/:category", getProjectByCategory);

router.get("/projects/:keyword", getProjectByStatus);

router.get("/projects/:date", getProjectByDate);

router.get("/projects/:title", getProjectByTitle);

export default router;