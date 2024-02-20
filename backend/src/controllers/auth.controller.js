import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.client.js";

import { createAccessToken } from "../libs/jwt.js";
import { academicRoleEnum, rolesEnum } from "../config/tags.js";

const secret = process.env.TOKEN_SECRET;

export const checkEmail = async (req, res) => {
	try {
		const userFound = await prisma.user.findUnique({
			where: {
				email: req.body.email,
			},
		});

		if (userFound) return res.status(400).json({ message: "User is already registered." });

		return res.status(200).json({ message: "User not registered" });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const register = async (req, res) => {
	console.log(req.body);
	const { email, password, fullName, academicRole, academicCourse, department, promotion } = req.body;
	let { username } = req.body;
	let role;

	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (foundUser)
			return res.status(400).json({
				message: "The email is already in use. Please log in instead.",
			});

		const salt = await bcrypt.genSalt(10);

		const hashedPassword = await bcrypt.hash(password, salt);

		// Control de rol segun email
		if (email.endsWith("@u-tad.com")) {
			if (academicRole === academicRoleEnum.TEACHER) role = rolesEnum.CREATOR;
			else
				return res.status(400).json({
					message: "You can only register as a teacher with an @u-tad.com email.",
				});
		} else {
			role = rolesEnum.USER;
		}

		// Control de usuario en caso de ser vacio asignar primera parte del email
		if (username === undefined) username = email.split("@")[0];

		// Y meter los datos aqui que falten
		const newUser = await prisma.user.create({
			data: {
				fullName: fullName,
				username: username,
				email: email,
				passwordHash: hashedPassword,
				academicRole: academicRole,
				role: role,
				academicCourse: academicCourse,
				department: department,
				promotion: promotion,
			},
		});

		const accessToken = await createAccessToken({
			id: newUser.id,
			role: newUser.role,
		});

		res.cookie("token", accessToken, {
			sameSite: "none",
			secure: true,
		});

		// Aquí no deberia retornar id ni role ni createdAt ni updatedAt, ya que van en el token
		return res.status(200).json({
			// id: newUser.id,
			username: newUser.username,
			email: newUser.email,
			// role: newUser.role,
			// createdAt: newUser.createdAt,
			// updatedAt: newUser.updatedAt
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		const foundUser = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		if (!foundUser)
			return res.status(400).json({
				message: "There doesn't exist an user with that email. Try registering instead.",
			});

		const passwordsMatch = bcrypt.compare(password, foundUser.passwordHash);

		if (!passwordsMatch) return res.status(400).json({ message: "The password is incorrect. Try again." });

		const accessToken = await createAccessToken({
			id: foundUser.id,
			role: foundUser.role,
		});

		console.log(accessToken);

		res.cookie("token", accessToken, {
			sameSite: "none",
			secure: true,
		});

		return res.status(200).json({
			// id: foundUser.id,
			username: foundUser.username,
			email: foundUser.email,
			role: foundUser.role,
			// createdAt: foundUser.createdAt,
			// updatedAt: foundUser.updatedAt
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const logout = async (req, res) => {
	res.cookie("token", "", {
		expires: new Date(0),
	});

	return res.status(200).json({ message: "Logged out successfully." });
};

export const profile = async (req, res) => {
	// const { id } = req.params;
	// console.log(req.userId)

	try {
		const userFound = await prisma.user.findUnique({
			where: {
				id: req.body.userId,
			},
		});

		if (!userFound) return res.status(404).json({ message: "User not found." });

		return res.json({
			id: userFound.id,
			username: userFound.username,
			email: userFound.email,
			createdAt: userFound.createdAt,
			updatedAt: userFound.updatedAt,
		});
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const verifyToken = async (req, res) => {
	const { token } = req.cookies;
	// console.log(req.cookies);
	// console.log(token);

	if (!token) return res.status(401).json({ message: "No token provided." });

	jwt.verify(token, secret, async (err, payload) => {
		if (err) return res.status(403).json({ message: "Invalid token." });
		console.log(payload);

		const userFound = await prisma.user.findUnique({
			where: {
				id: payload.id,
			},
		});

		if (!userFound) return res.status(404).json({ message: "User not found." });

		return res.json({
			// id: userFound.id,
			username: userFound.username,
			email: userFound.email,
			// createdAt: userFound.createdAt,
			// updatedAt: userFound.updatedAt
		});
	});
};

// I don't know to what extent this is necessary
export const refreshToken = async (req, res) => {
	const { token } = req.cookies;

	if (!token) return res.status(401).json({ message: "No token provided." });

	jwt.verify(token, secret, async (err, user) => {
		if (err) return res.status(403).json({ message: "Invalid token." });

		const userFound = await prisma.user.findUnique({
			where: {
				id: user.id,
			},
		});

		if (!userFound) return res.status(404).json({ message: "User not found." });

		const accessToken = await createAccessToken({ id: userFound.id });

		res.cookie("token", accessToken, {
			sameSite: "none",
			secure: true,
		});

		return res.json({
			id: userFound.id,
			username: userFound.username,
			email: userFound.email,
			createdAt: userFound.createdAt,
			updatedAt: userFound.updatedAt,
		});
	});
};
