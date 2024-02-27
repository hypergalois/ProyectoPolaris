import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

// Tengo un problema con las variables de entorno, que sin importar
// dotenv aqui, no las reconoce
// Supuestamente haciendolo solo en app.js deberia bastar

const secret = process.env.TOKEN_SECRET;

export function createAccessToken(payload) {
	// console.log(secret);
	// console.log(payload);

	// TODO Tiempo de expiracion del token puede estar en el .env
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secret, { expiresIn: 86400 }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
}

export function createResetPasswordToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, secret, { expiresIn: 36000 }, (err, token) => {
			if (err) reject(err);
			resolve(token);
		});
	});
}
