import React from "react";
import type { Preview, Decorator, StoryFn, StoryContext } from "@storybook/nextjs";
import { NftProvider } from "../src/components/NftProvider";
import "../src/styles/globals.css";

// ------------------------
// Optional OpenTelemetry bootstrap
// ------------------------
const OTEL_EXPORTER_OTLP_ENDPOINT = process.env.OTEL_EXPORTER_OTLP_ENDPOINT;

if (typeof window !== "undefined" && OTEL_EXPORTER_OTLP_ENDPOINT) {
  (async () => {
    try {
      // Lazy import OTEL packages (ESM-safe)
      const { WebTracerProvider } = await import("@opentelemetry/sdk-trace-web");
      const { SimpleSpanProcessor, ConsoleSpanExporter } = await import("@opentelemetry/sdk-trace-base");
      const { registerInstrumentations } = await import("@opentelemetry/instrumentation");
      const { FetchInstrumentation } = await import("@opentelemetry/instrumentation-fetch");

      const provider = new WebTracerProvider();

      // Always log spans locally
      provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));

      // Optional HTTP exporter if OTEL endpoint exists
      try {
        const { OTLPTraceExporter } = await import("@opentelemetry/exporter-trace-otlp-http");
        provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({
          url: OTEL_EXPORTER_OTLP_ENDPOINT
        })));
        console.info(`🔭 Storybook tracing to ${OTEL_EXPORTER_OTLP_ENDPOINT}`);
      } catch {
        console.warn("⚠️ OTEL HTTP exporter not installed; using console spans only.");
      }

      provider.register();

      // Instrument network requests
      registerInstrumentations({
        instrumentations: [new FetchInstrumentation()],
      });

      console.info("✅ OpenTelemetry tracing initialized in Storybook.");
    } catch (err) {
      console.warn("ℹ️ OTEL tracing skipped (not installed or disabled):", err?.message || err);
    }
  })();
}

// ------------------------
// Your existing decorators
// ------------------------
const withProviders: Decorator = (Story: StoryFn, context: StoryContext) => (
  <NftProvider>
    <div className="bg-gray-950 text-white min-h-screen p-6">
      <Story {...context} />
    </div>
  </NftProvider>
);

const preview: Preview = {
  decorators: [withProviders],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    a11y: {
      test: "todo",
    },
    layout: "centered",
  },
};

export default preview;
