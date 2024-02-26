import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import prisma from "../config/prisma.client.js";

import { createAccessToken } from "../libs/jwt.js";
import { rolesEnum, academicRoleEnum } from "../config/tags.js";

const secret = process.env.TOKEN_SECRET;
const BCRYPT_SALT_ROUNDS = process.env.BCRYPT_SALT_ROUNDS;

// Ruta que se usa en el registro para comprobar si el email ya esta registrado
export const checkEmailRegister = async (req, res) => {
	const { email } = req.body;
	console.log(email);

	try {
		const userFound = await prisma.user.findUnique({
			where: {
				email: email,
			},
		});

		// Solo tengo en cuenta que hay dos posibles casos, este o el @u-tad.
		const isStudent = email.endsWith("@live.u-tad.com");

		if (userFound) return res.status(400).json({ message: "User is already registered.", userExists: true, isStudent });

		return res.status(200).json({ message: "User is not registered.", userExists: false, isStudent });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ message: error.message });
	}
};

export const register = async (req, res) => {
	// console.log(req.body);
	const { email, password, fullName, academicRole, academicCourse, department, promotion } = req.body;
	// No puede ser constante porque si no se asigna el valor por defecto
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
				userExists: true,
			});

		const salt = await bcrypt.genSalt(BCRYPT_SALT_ROUNDS);

		const hashedPassword = await bcrypt.hash(password, salt);

		console.log(email);

		// Asignación automatica de rol según el email
		// La comprobación subsiguiente de academicRole es innecesaria ya que
		if (email.endsWith("@u-tad.com")) {
			if (academicRole === academicRoleEnum.ALUMN || academicRole === academicRoleEnum.ALUMNI) {
				return res.status(400).json({ message: "The academic role is not valid." });
			}
			role = rolesEnum.CREATOR;
		} else if (email.endsWith("@live.u-tad.com")) {
			if (academicRole === academicRoleEnum.EMPLOYEE || academicRole === academicRoleEnum.PROFESSOR || academicRole === academicRoleEnum.COORDINATOR) {
				return res.status(400).json({ message: "The academic role is not valid." });
			}
			role = rolesEnum.USER;
		} else {
			// Nunca deberia llegar a este caso
			return res.status(400).json({ message: "The email is not valid." });
		}

		// Control de usuario en caso de ser vacio asignar primera parte del email
		if (!username) username = email.split("@")[0];

		// console.log(role);

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

		return res.status(200).json({
			username: newUser.username,
			email: newUser.email,
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
				userExists: false,
			});

		const passwordsMatch = bcrypt.compare(password, foundUser.passwordHash);

		if (!passwordsMatch) return res.status(400).json({ message: "The password is incorrect. Try again.", userExists: true, passwordsMatch: false });

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
			username: foundUser.username,
			email: foundUser.email,
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
				id: req.userId,
			},
		});

		if (!userFound) return res.status(404).json({ message: "User not found.", userExists: false });

		return res.status(200).json({
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

		if (!userFound) return res.status(404).json({ message: "User not found.", userExists: false });

		return res.status(200).json({
			username: userFound.username,
			email: userFound.email,
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
