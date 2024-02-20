import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export const authRequired = async (req, res, next) => {
	const { token } = req.cookies;

	if (!token) return res.status(401).json({ message: "No token provided." });

	jwt.verify(token, secret, (err, payload) => {
		if (err) return res.status(403).json({ message: "Invalid token." });

		req.userId = payload.id;
		req.role = payload.role;

		next();
	});
};
