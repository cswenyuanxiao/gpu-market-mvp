#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
ROOT_DIR="$(cd "${SCRIPT_DIR}/.." && pwd)"

if ! command -v docker >/dev/null 2>&1; then
  echo "[dev-down] Docker is required." >&2
  exit 1
fi

pushd "${ROOT_DIR}" >/dev/null
docker compose down
popd >/dev/null

echo "[dev-down] Stack stopped."


