import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import * as Sentry from "@sentry/react";
import { createRoutesFromChildren, matchRoutes, useLocation, useNavigationType } from "react-router";

Sentry.init({
	dsn: "https://4f70832fa228f86f497e804430f18aef@o4506865225564160.ingest.us.sentry.io/4506865228382208",
	integrations: [
		Sentry.reactRouterV6BrowserTracingIntegration({
			useEffect: React.useEffect,
			useLocation,
			useNavigationType,
			createRoutesFromChildren,
			matchRoutes,
		}),
		Sentry.replayIntegration(),
	],

	tracesSampleRate: 1.0,

	tracePropagationTargets: ["localhost", "mydomain.com", "myotherdomain.com"],

	replaysSessionSampleRate: 0.1,
	replaysOnErrorSampleRate: 1.0,
});

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<App />
	</React.StrictMode>
);
