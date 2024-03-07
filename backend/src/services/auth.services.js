import prisma from "../config/prisma.client.js";
import { createResetPasswordToken, createVerifyEmailToken } from "../libs/jwt.js";
import sendEmail from "../util/emails/sendEmail.js";

const CLIENT_URL = process.env.CLIENT_URL;

export const handleForgotPassword = async (req, res, email) => {
	try {
		// Viene del middleware del token
		const { email } = req.body;
		console.log(email);

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
		const resetLink = `${CLIENT_URL}/reset-password?resetToken=${resetToken}`;
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

		const verifyToken = await createVerifyEmailToken({ email: req.body.email });

		const updatedUser = await prisma.user.update({
			where: {
				email,
			},
			data: {
				verifyEmailToken: verifyToken,
			},
		});

		if (!updatedUser) return res.status(500).json({ message: "Error updating user." });

		const verifyLink = `${CLIENT_URL}/verify-email?verifyToken=${verifyToken}`;
		console.log(verifyLink);

		await sendEmail(email, "Verify your email", { verifyLink }, "./templates/verifyEmail.handlebars");

		return true;
	} catch (error) {
		console.log(error);
		// return res.status(500).json({ message: error.message });
		return false;
	}
};
