import { Router } from "express";
import { register, login, logout, profile, getUser, verifyToken, checkEmailRegister, forgotPassword, resetPassword, getUserRole } from "../controllers/auth.controllers.js";

import { registerSchema, loginSchema } from "../schemas/auth.schema.js";
import { authRequired } from "../middlewares/authRequired.middleware.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { resetPasswordTokenValid } from "../middlewares/resetPasswordTokenValid.middleware.js";
import { verifyEmailTokenValid } from "../middlewares/verifyEmailTokenValid.middleware.js";
import { verifyEmail } from "../controllers/auth.controllers.js";

const router = Router();

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registro de un nuevo usuario
 *     description: Registra un nuevo usuario en el sistema.
 *     tags:
 *       - Registro
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Nombre completo del usuario.
 *               username:
 *                 type: string
 *                 description: Nombre de usuario.
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *               academicRole:
 *                 type: string
 *                 description: Rol académico del usuario.
 *               promotion:
 *                 type: string
 *                 description: Promoción del usuario (opcional).
 *               department:
 *                 type: string
 *                 description: Departamento del usuario (opcional).
 *               academicCourse:
 *                 type: string
 *                 description: Curso académico del usuario (opcional).
 *     responses:
 *       '200':
 *         description: Usuario registrado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Error en la solicitud del cliente
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/register", validateSchema(registerSchema), register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicio de sesión de usuario
 *     description: Inicia sesión de un usuario existente en el sistema.
 *     tags:
 *       - Autenticación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 description: Correo electrónico del usuario.
 *               password:
 *                 type: string
 *                 description: Contraseña del usuario.
 *     responses:
 *       '200':
 *         description: Usuario autenticado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/UserResponse'
 *       '400':
 *         description: Error en la solicitud del cliente
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/login", validateSchema(loginSchema), login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Cierre de sesión de usuario
 *     description: Cierra la sesión del usuario actualmente autenticado.
 *     tags:
 *       - Autenticación
 *     responses:
 *       '200':
 *         description: Sesión cerrada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de confirmación del cierre de sesión.
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/logout", logout);

/**
 * @swagger
 * /getEmail:
 *   get:
 *     summary: Obtener información de email
 *     description: Obtiene información sobre si un correo electrónico está registrado en el sistema.
 *     tags:
 *       - Usuario
 *     parameters:
 *       - in: query
 *         name: email
 *         description: Correo electrónico del usuario a verificar
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Petición exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Indica si el usuario está registrado o no.
 *       '400':
 *         description: Correo electrónico ya registrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el correo electrónico ya está registrado.
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/checkEmailRegister", checkEmailRegister);

/**
 * @swagger
 * /profile:
 *   get:
 *     summary: Obtener perfil de usuario
 *     description: Obtiene el perfil del usuario autenticado.
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Petición exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del usuario
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación del usuario
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de la última actualización del usuario
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el usuario no fue encontrado.
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/profile", authRequired, profile);

/**
 * @swagger
 * /getUser:
 *   get:
 *     summary: Obtiene informacion modificable del usuario buscado
 *     description: Obtiene informacion modificable del usuario buscado del usuario autenticado.
 *     tags:
 *       - Usuario
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Petición exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: ID del usuario
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario del usuario
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de creación del usuario
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Fecha y hora de la última actualización del usuario
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el usuario no fue encontrado.
 *       '500':
 *         description: Error interno del servidor
 */

router.post("/getUser", authRequired, getUser);

/**
 * @swagger
 * /verify:
 *   get:
 *     summary: Verificar token de autenticación
 *     description: Verifica si el token de autenticación proporcionado en las cookies es válido y devuelve la información del usuario asociado.
 *     tags:
 *       - Autenticación
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       '200':
 *         description: Petición exitosa
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Nombre de usuario del usuario autenticado
 *                 email:
 *                   type: string
 *                   description: Correo electrónico del usuario autenticado
 *       '401':
 *         description: No se proporcionó ningún token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que no se proporcionó ningún token.
 *       '403':
 *         description: Token inválido
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el token proporcionado no es válido.
 *       '404':
 *         description: Usuario no encontrado
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Mensaje de error indicando que el usuario asociado al token no fue encontrado.
 */

router.get("/verify", verifyToken);

/**
 * @swagger
 * /getUserRole:
 *   get:
 *     summary: Get user role
 *     description: Obtains the role of the authenticated user.
 *     tags:
 *       - User
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Successful operation. Returns the role of the authenticated user.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 role:
 *                   type: string
 *                   description: Role of the authenticated user.
 *       404:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user was not found.
 *                 userExists:
 *                   type: boolean
 *                   description: Boolean indicating whether the user exists or not.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the internal server error.
 */
// todo añadir authRequired
router.get("/getUserRole", authRequired, getUserRole);

/**
 * @swagger
 * /forgotPassword:
 *   post:
 *     summary: Forgot password
 *     description: Sends a password reset email to the user with the provided email address.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Email address of the user requesting password reset.
 *     responses:
 *       200:
 *         description: Email sent successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Confirmation message indicating that the email was sent successfully.
 *                 userExists:
 *                   type: boolean
 *                   description: Boolean indicating whether the user with the provided email address exists.
 *       400:
 *         description: User not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating that the user was not found.
 *                 userExists:
 *                   type: boolean
 *                   description: Boolean indicating whether the user exists or not.
 *       500:
 *         description: Internal server error.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   description: Error message indicating the internal server error.
 */

router.post("/forgotPassword", forgotPassword);

router.post("/resetPassword", resetPasswordTokenValid, resetPassword);

router.post("/verifyEmail", verifyEmailTokenValid, verifyEmail);

export default router;
