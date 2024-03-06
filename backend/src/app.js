import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

import prisma from "./config/prisma.client.js";
import swaggerUi from "swagger-ui-express";
import swaggerSpecs from "./docs/swagger.js";
import { authRequired } from "./middlewares/auth.middleware.js";

dotenv.config();

import authRoutes from "./routes/auth.routes.js";
import projectRoutes from "./routes/projects.routes.js";
import degreeRoutes from "./routes/degrees.routes.js";
import areaRoutes from "./routes/areas.routes.js";
import requestRoutes from "./routes/requests.routes.js";
import testRoutes from "./routes/test.routes.js";

const CLIENT_URL = process.env.CLIENT_URL || "http://localhost:5173";
console.log("Client URL is:", CLIENT_URL);

const app = express();

Sentry.init({
	dsn: "https://bfdccb9871649cf40f7c41c1937f2c46@o4506865225564160.ingest.us.sentry.io/4506865231003648",
	integrations: [
		// enable HTTP calls tracing
		new Sentry.Integrations.Http({ tracing: true }),
		// enable Express.js middleware tracing
		new Sentry.Integrations.Express({ app }),
		new ProfilingIntegration(),
	],
	// Performance Monitoring
	tracesSampleRate: 1.0, //  Capture 100% of the transactions
	// Set sampling rate for profiling - this is relative to tracesSampleRate
	profilesSampleRate: 1.0,
});

// The request handler must be the first middleware on the app
app.use(Sentry.Handlers.requestHandler());

// TracingHandler creates a trace for every incoming request
app.use(Sentry.Handlers.tracingHandler());

app.use(
	cors({
		origin: CLIENT_URL,
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

// The error handler must be registered before any other error middleware and after all controllers
app.use(Sentry.Handlers.errorHandler());

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
	// The error id is attached to `res.sentry` to be returned
	// and optionally displayed to the user for support.
	res.statusCode = 500;
	res.end(res.sentry + "\n");
});

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
	// Mandarlo a Slack o sistema de monitoreo
	// Aquí puedes integrar tu código para enviar el log a un sistema externo
	// Ejemplo: sendErrorToMonitoringSystem(reason, promise);
});

process.on("uncaughtException", (error) => {
	console.error("Uncaught Exception thrown", error);
	// Mandarlo a Slack o sistema de monitoreo
	// Aquí puedes integrar tu código para enviar el log a un sistema externo
	// Ejemplo: sendErrorToMonitoringSystem(error);
	// Considera la posibilidad de realizar una limpieza suave aquí si es necesario
});

app.on("close", () => {
	prisma.$disconnect();
});

export default app;
