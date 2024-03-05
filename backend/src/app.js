import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import prisma from "./config/prisma.client.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger.js";
import { authRequired } from "./middlewares/authRequired.middleware.js";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import degreeRoutes from "./routes/degrees.routes.js";
import areaRoutes from "./routes/areas.routes.js";
import requestRoutes from "./routes/requests.routes.js";
import testRoutes from "./routes/test.routes.js";

const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

// TODO: CAMBIAR ESTO A UNA VARIABLE DE ENTORNO
app.use(
	cors({
		origin: "https://proyectopolaris.up.railway.app" || "http://localhost:5173",
		credentials: true,
	})
);

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/uploads", authRequired, express.static("uploads"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpecs, { explorer: true }));

app.use("/api", authRoutes);
app.use("/api", projectRoutes);
app.use("/api", degreeRoutes);
app.use("/api", areaRoutes);
app.use("/api", requestRoutes);
app.use("/api", testRoutes);

// process.on("unhandledRejection", (reason, promise) => {
// 	// Mandarlo a Slack
// 	console.error("Unhandled Rejection at:", promise, "reason:", reason);
// 	server.close(() => process.exit(1));
// });

// process.on("uncaughtException", (error) => {
// 	// Mandarlo a Slack
// 	console.error("Uncaught Exception thrown", error);
// 	server.close(() => process.exit(1));
// });

app.on("close", () => {
	prisma.$disconnect();
});

export default app;
