import { Router } from "express";
import { getAreas, getArea, createArea, updateArea, deleteArea } from "../controllers/areas.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { areaSchema } from "../schemas/area.schema.js";

const router = Router();

// Main routes

router.get("/areas", getAreas);

router.get("/areas/:id", getArea);

router.post("/areas", validateSchema(areaSchema), createArea);

router.put("/areas/:id", updateArea);

router.delete("/areas/:id", deleteArea);

export default router;