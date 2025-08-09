#!/usr/bin/env bash
set -euo pipefail

# Resolve project root (supports spaces in path)
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

echo "[dev-up] Project root: ${ROOT_DIR}"

# Pre-flight checks
if ! command -v docker >/dev/null 2>&1; then
  echo "[dev-up] Docker is required. Please install Docker Desktop and try again." >&2
  exit 1
fi
if ! command -v docker compose >/dev/null 2>&1; then
  echo "[dev-up] Docker Compose V2 is required (docker compose). Please update Docker." >&2
  exit 1
fi

# Build SPA (outputs to frontend/dist for backend to serve)
echo "[dev-up] Building SPA..."
pushd "${ROOT_DIR}/frontend-spa" >/dev/null
if command -v npm >/dev/null 2>&1; then
  (npm ci || npm install)
  npm run build
else
  echo "[dev-up] npm not found. Install Node.js 20+ to build the SPA." >&2
  exit 1
fi
popd >/dev/null

# Start stack with Docker Compose
echo "[dev-up] Starting Docker Compose stack..."
pushd "${ROOT_DIR}" >/dev/null
docker compose up --build -d
popd >/dev/null

echo "[dev-up] Done. Access your app at:"
echo "  UI & API: http://localhost:3000"
echo "  Health:  http://localhost:3000/health"
echo "  Docs:    http://localhost:3000/docs"
echo "  Metrics: http://localhost:3000/metrics"


