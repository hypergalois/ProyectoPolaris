import { Router } from "express";
import { register, login, logout, profile, verifyToken, refreshToken } from "../controllers/auth.controller.js";

import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { authRequired } from "../middlewares/authRequired.middleware.js";

const router = Router();

// TODO, validateSchema(registerSchema)
router.post("/register", register);

// TODO validateSchema(loginSchema)
router.post("/login", login);

router.post("/logout", logout);

router.get("/profile", authRequired, profile);

router.get("/verify", verifyToken);

export default router;