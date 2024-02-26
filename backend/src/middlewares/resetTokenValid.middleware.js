import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export const resetTokenValid = async (req, res, next) => {
	const { token } = req.params;

	if (!token) return res.status(401).json({ message: "No token provided." });

	jwt.verify(token, secret, (err, payload) => {
		if (err) return res.status(403).json({ message: "Invalid token." });

		// Solo necesitamos el email en principio
		req.email = payload.email;

		next();
	});
};
