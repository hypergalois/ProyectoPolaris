import { Router } from "express";
import { getAwards } from "../controllers/awards.controllers.js";

const router = Router();

// https://proyectopolaris.postman.co/workspace/My-Workspace~7ad015f7-88f4-4d09-8a04-281788145a86/collection/32885635-d46c359d-aaec-492e-ab6b-a230983de3d5?action=share&creator=26303495

router.get("/awards", getAwards);

export default router;
