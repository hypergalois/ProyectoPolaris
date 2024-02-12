import { Router } from "express";
import { createDepartment, deleteDepartment, getDepartment, getDepartments, updateDepartment } from "../controllers/departments.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { departmentSchema } from "../schemas/department.schema.js";

const router = Router();

// Main routes

router.get("/departments", getDepartments);

router.get("/departments/:id", getDepartment);

router.post("/departments", validateSchema(departmentSchema), createDepartment);

router.put("/departments/:id", updateDepartment);

router.delete("/departments/:id", deleteDepartment);

export default router;