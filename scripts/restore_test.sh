#!/usr/bin/env bash
set -euo pipefail

APP_NAME="docker-secure-platform"
RESTORE_DIR="/tmp/${APP_NAME}-restore-test"

if [ "$#" -ne 1 ]; then
  echo "Usage: $0 /path/to/backup.tar.gz"
  exit 1
fi

ARCHIVE_PATH="$1"

if [ ! -f "${ARCHIVE_PATH}" ]; then
  echo "ERROR: archive not found: ${ARCHIVE_PATH}"
  exit 1
fi

rm -rf "${RESTORE_DIR}"
mkdir -p "${RESTORE_DIR}"

echo "Extracting ${ARCHIVE_PATH} into ${RESTORE_DIR}..."
tar -xzf "${ARCHIVE_PATH}" -C "${RESTORE_DIR}"

echo "Restore test content:"
find "${RESTORE_DIR}" -maxdepth 3 -type d | sort

echo "Restore test completed successfully."
