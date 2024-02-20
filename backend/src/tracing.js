// tracing.js
"use strict";
import process from "process";
import opentelemetry from "@opentelemetry/sdk-node";
import { getNodeAutoInstrumentations } from "@opentelemetry/auto-instrumentations-node";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";

export default function initTracer() {
    const exporterOptions = {
        url: "http://localhost:4318/v1/traces",
    };

    const traceExporter = new OTLPTraceExporter(exporterOptions);
    const sdk = new opentelemetry.NodeSDK({
        traceExporter,
        instrumentations: [getNodeAutoInstrumentations()],
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]:
                "proyecto-polaris-backend",
        }),
    });

    sdk.start();

    process.on("SIGTERM", () => {
        sdk.shutdown()
            .then(() => console.log("Tracing terminated"))
            .catch((error) => console.log("Error terminating tracing", error))
            .finally(() => process.exit(0));
    });
}
