import prisma from "../config/prisma.client.js";
import { createResetPasswordToken } from "../libs/jwt.js";
import sendEmail from "../util/emails/sendEmail.js";

export const handleForgotPassword = async (req, res, email) => {
	try {
		// Viene del middleware del token
		const { email } = req.body;
		console.log(email);

		const userFound = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		// Ya hemos comprobado que el usuario existe antes
		// Creamos un token de reset
		// TODO: Le metemos el email solamente
		const resetToken = await createResetPasswordToken({ email: req.body.email });

		// Le metemos el token al usuario
		const updatedUser = await prisma.user.update({
			where: {
				email,
			},
			data: {
				resetPasswordToken: resetToken,
			},
		});

		if (!updatedUser) return res.status(500).json({ message: "Error updating user." });

		// Send email with reset link to user
		const resetLink = `http://localhost:5173/reset-password?resetToken=${resetToken}`;
		console.log(resetLink);

		await sendEmail(email, "Reset your password", { resetLink }, "./templates/requestResetPassword.handlebars");

		return true;
	} catch (error) {
		console.log(error);
		// return res.status(500).json({ message: error.message });
		return false;
	}
};

export const handleVerifyEmail = async (req, res, email) => {
	try {
		// Viene del middleware del token
		const { email } = req.body;
		console.log(email);

		const userFound = await prisma.user.findUnique({
			where: {
				email,
			},
		});

		// Ya hemos comprobado que el usuario existe antes
		// Creamos un token de reset
	} catch (error) {
		console.log(error);
		// return res.status(500).json({ message: error.message });
		return false;
	}
};
