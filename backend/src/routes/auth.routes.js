import { Router } from "express";
import { register, login, logout, profile, verifyToken, refreshToken } from "../controllers/auth.controller.js";

const router = Router();

router.post("/register", register);

router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", profile);

router.get("/verify", verifyToken);

export default router;