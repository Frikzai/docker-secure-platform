#!/usr/bin/env bash
set -euo pipefail

echo "Docker Secure Platform - container status"

if ! command -v docker >/dev/null 2>&1; then
  echo "ERROR: docker command not found"
  exit 1
fi

docker ps --format "table {{.Names}}\t{{.Image}}\t{{.Status}}"
