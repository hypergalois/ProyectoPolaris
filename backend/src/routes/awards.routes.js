import { Router } from "express";
import { getAwards } from "../controllers/awards.controllers.js";

const router = Router();

router.get("/awards", getAwards);

export default router;