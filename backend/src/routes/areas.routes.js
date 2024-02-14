import { Router } from "express";
import { getAreas, getArea, createArea, updateArea, deleteArea } from "../controllers/areas.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { areaSchema } from "../schemas/area.schema.js";

const router = Router();

// Main routes

router.get("/area", getAreas);

router.get("/area/:id", getArea);

router.post("/area", validateSchema(areaSchema), createArea);

router.put("/area/:id", updateArea);

router.delete("/area/:id", deleteArea);

export default router;