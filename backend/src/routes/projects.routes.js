import { Router } from "express";
import upload from "../multer.js";

const router = Router();

router.get("/projects");

router.get("/projects/:id");

router.post("/projects");

router.put("/projects/:id");

router.delete("/projects/:id");

export default router;