#!/usr/bin/env bash
set -euo pipefail

OTEL_PORT_GRPC=4317
OTEL_PORT_HTTP=4318
JAEGER_HTTP_PORT=14268
JAEGER_UI_PORT=16686
GRAFANA_PORT=3000

echo "🚀 Starting Jaeger..."
jaeger-all-in-one \
  --collector.http-server.host-port=":${JAEGER_HTTP_PORT}" \
  --query.http-server.host-port=":${JAEGER_UI_PORT}" \
  --collector.zipkin.http-port=0 \
  > jaeger.log 2>&1 &
JAEGER_PID=$!

sleep 2

echo "🚀 Starting OpenTelemetry Collector..."
opentelemetry-collector --config otel-config.yaml > otel.log 2>&1 &
OTEL_PID=$!

sleep 2

echo "🚀 Starting Grafana..."
grafana server \
  --homepath="$(grafana paths.home)" \
  --config="$(grafana paths.cfg)" \
  --port "${GRAFANA_PORT}" \
  > grafana.log 2>&1 &
GRAFANA_PID=$!

echo ""
echo "✅ Tracing stack running:"
echo "  OpenTelemetry Collector: grpc localhost:${OTEL_PORT_GRPC}, http localhost:${OTEL_PORT_HTTP}"
echo "  Jaeger UI:               http://localhost:${JAEGER_UI_PORT}"
echo "  Grafana:                 http://localhost:${GRAFANA_PORT}"
echo ""
echo "Press Ctrl+C to stop all."

trap "kill $JAEGER_PID $OTEL_PID $GRAFANA_PID" EXIT
wait

