import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export const resetPasswordTokenValid = async (req, res, next) => {
	console.log(req.body);
	const { resetToken } = req.body;
	console.log(resetToken);

	if (!resetToken) return res.status(401).json({ message: "No token provided." });

	jwt.verify(resetToken, secret, (err, payload) => {
		if (err) return res.status(403).json({ message: "Invalid token." });

		// Solo necesitamos el email en principio
		req.email = payload.email;
		console.log(req.email);

		next();
	});
};
