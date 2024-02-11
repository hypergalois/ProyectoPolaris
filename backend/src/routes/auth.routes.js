import { Router } from "express";
import { register } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login");

router.post("/logout");

router.get("/profile");

router.get("/verify");

export default router;