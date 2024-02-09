import { Router } from "express";

const router = Router();

router.get("/healthz", (req, res) => {
    console.log("Health check");
    res.status(200).json({ message: "OK" });
});

export default router;