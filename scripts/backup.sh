#!/usr/bin/env bash
set -euo pipefail

APP_NAME="docker-secure-platform"
APP_DIR="/opt/docker-secure-platform"
DATA_DIR="${APP_DIR}/data"
BACKUP_DIR="/opt/backups/${APP_NAME}"
RETENTION_DAYS=7
DATE="$(date +%Y-%m-%d_%H-%M-%S)"
ARCHIVE_NAME="${APP_NAME}_${DATE}.tar.gz"
ARCHIVE_PATH="${BACKUP_DIR}/${ARCHIVE_NAME}"
LOG_FILE="${BACKUP_DIR}/backup.log"

mkdir -p "${BACKUP_DIR}"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Starting backup..." | tee -a "${LOG_FILE}"

if [ ! -d "${DATA_DIR}" ]; then
  echo "[$(date '+%Y-%m-%d %H:%M:%S')] ERROR: data directory not found: ${DATA_DIR}" | tee -a "${LOG_FILE}"
  exit 1
fi

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Creating archive: ${ARCHIVE_PATH}" | tee -a "${LOG_FILE}"

tar \
  -czf "${ARCHIVE_PATH}" \
  -C "${APP_DIR}" \
  data docker-compose.yml .env

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Archive created successfully." | tee -a "${LOG_FILE}"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Removing backups older than ${RETENTION_DAYS} days..." | tee -a "${LOG_FILE}"

find "${BACKUP_DIR}" \
  -type f \
  -name "${APP_NAME}_*.tar.gz" \
  -mtime +"${RETENTION_DAYS}" \
  -delete

chown -R ubuntu:ubuntu "${BACKUP_DIR}"

echo "[$(date '+%Y-%m-%d %H:%M:%S')] Backup completed: ${ARCHIVE_PATH}" | tee -a "${LOG_FILE}"
