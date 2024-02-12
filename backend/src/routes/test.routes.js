import { Router } from "express";
import { authRequired } from "../middlewares/authRequired.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";

const router = Router();

router.get("/healthz", (req, res) => {
    console.log("Health check");
    res.status(200).json({ message: "OK" });
});

router.get("/whatRole", authRequired, (req, res) => {
    
    console.log(req.userId);
    console.log(req.role);

    if (req.role === "ADMIN") {
        res.status(200).json({ message: "You are an admin." });
        return;
    } else if (req.role === "USER") {
        res.status(200).json({ message: "You are a user." });
        return;
    } else if (req.role === "CREATOR") {
        res.status(200).json({ message: "You are a creator." });
        return;
    } else {
        res.status(403).json({ message: "You are not allowed." });
        return;
    }
});

router.get("/checkRole", authRequired, checkRole(["ADMIN", "USER", "CREATOR"]), (req, res) => {
    res.status(200).json({ message: "You are allowed." });
});

export default router;