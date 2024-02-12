import { Router } from "express";
import { createRequest, deleteRequest, getRequest, getRequests, updateRequest, acceptRequest, rejectRequest } from "../controllers/requests.controller.js";

const router = Router();

// Main routes

router.get("/requests", getRequests);

router.get("/requests/:id", getRequest);

router.post("/requests", createRequest);

router.put("/requests/:id", updateRequest);

router.delete("/requests/:id", deleteRequest);

// Utility routes

router.post("/requests/accept/:id", acceptRequest);

router.post("/requests/reject/:id", rejectRequest);

export default router;