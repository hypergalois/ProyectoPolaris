import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const secret = process.env.TOKEN_SECRET;

export const verifyEmailTokenValid = async (req, res, next) => {
	console.log(req.body);
	const { emailToken } = req.body;

	if (!emailToken) return res.status(401).json({ message: "No token provided." });

	jwt.verify(emailToken, secret, (err, payload) => {
		if (err) return res.status(403).json({ message: "Invalid token." });

		req.email = payload.email;
		console.log(req.email);

		next();
	});
};
