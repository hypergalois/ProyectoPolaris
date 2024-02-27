import sgMail from "@sendgrid/mail";
import handlebars from "handlebars";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

// Obtenemos el directorio actual de forma compatible con ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const sendEmail = async (email, subject, payload, template) => {
	try {
		const source = fs.readFileSync(path.join(__dirname, template), "utf8");
		const compiledTemplate = handlebars.compile(source);

		const msg = {
			to: email,
			from: process.env.FROM_EMAIL,
			subject: subject,
			html: compiledTemplate(payload),
		};

		await sgMail.send(msg);
		console.log("Email enviado correctamente");
	} catch (error) {
		console.error("Error mandando correo", error);
	}
};

/*
Example:
sendEmail(
    "youremail@gmail.com",
    "Email subject",
    { name: "Eze" },
    "./templates/layouts/main.handlebars"
);
*/

export default sendEmail;
