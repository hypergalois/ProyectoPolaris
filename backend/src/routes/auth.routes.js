import { Router } from "express";


const router = Router();

router.post("/signup");

router.post("/login");

router.post("/logout");

router.get("/profile");

router.get("/verify");

export default router;