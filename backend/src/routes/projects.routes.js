import { Router } from "express";
import { createProject, deleteProject, getProject, getProjectByCategory, getProjectByDate, getProjectByStatus, getProjectByTitle, getProjectByUser, getProjects, updateProject } from "../controllers/projects.controllers.js";
import { uploadFile } from "../middlewares/uploadFile.middleware.js";
import { authRequired } from "../middlewares/authRequired.middleware.js"
import { validateSchema } from "../middlewares/validator.middleware.js";
import { projectSchema, updateProjectSchema } from "../schemas/project.schema.js";

const router = Router();

// Main routes
// TODO: Poner authRequired a todas las rutas cuando esté más avanzado el proyecto

router.get("/projects", authRequired, getProjects);

router.get("/projects/:id", authRequired, getProject);

// validateSchema(projectSchema)
router.post("/projects", authRequired, uploadFile.array("files", 5), createProject);

router.put("/projects/:id", authRequired, validateSchema(updateProjectSchema), updateProject);

router.delete("/projects/:id", authRequired, deleteProject);

// Searching routes

router.get("/projects/user/:userId", authRequired, getProjectByUser);

router.get("/projects/category/:category", authRequired, getProjectByCategory);

router.get("/projects/keyword/:keyword", authRequired, getProjectByStatus);

router.get("/projects/date/:date", authRequired, getProjectByDate);

router.get("/projects/title/:title", authRequired, getProjectByTitle);

export default router;