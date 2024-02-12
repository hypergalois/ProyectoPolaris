import { Router } from "express";
import { createDegree, deleteDegree, getDegree, getDegrees, updateDegree } from "../controllers/degrees.contoller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { degreeSchema } from "../schemas/degree.schema.js";

const router = Router();

// Main routes

router.get("/degrees", getDegrees);

router.get("/degrees/:id", getDegree);

router.post("/degrees", validateSchema(degreeSchema), createDegree);

router.put("/degrees/:id", updateDegree);

router.delete("/degrees/:id", deleteDegree);

export default router;