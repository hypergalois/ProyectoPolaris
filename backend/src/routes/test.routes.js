import { Router } from "express";
import { authRequired } from "../middlewares/authRequired.middleware.js";
import { checkRole } from "../middlewares/checkRole.middleware.js";
import { testController } from "../controllers/test.controllers.js";

const router = Router();

// https://proyectopolaris.postman.co/workspace/My-Workspace~7ad015f7-88f4-4d09-8a04-281788145a86/collection/26303495-63695411-b7f1-4633-a7b1-750b4e3dadea?action=share&creator=26303495

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

router.get("/test", authRequired, testController);

export default router;
