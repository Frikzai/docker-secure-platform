
import os
import shutil
import socket
import subprocess
from datetime import datetime
from pathlib import Path

import httpx
from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates


APP_NAME = "Homelab Portal"
BACKUP_DIR = Path(os.getenv("BACKUP_DIR", "/backups"))
CHECK_TIMEOUT = float(os.getenv("CHECK_TIMEOUT", "3"))

SERVICES = [
    {
        "name": "Nginx Proxy Manager",
        "url": "https://frikzai-npm.duckdns.org",
        "description": "Reverse proxy HTTPS",
        "category": "Administration",
    },
    {
        "name": "Portainer",
        "url": "https://frikzai-portainer.duckdns.org",
        "description": "Gestion Docker",
        "category": "Administration",
    },
    {
        "name": "Uptime Kuma",
        "url": "https://frikzai-uptime.duckdns.org",
        "description": "Supervision des services",
        "category": "Supervision",
    },
    {
        "name": "Vaultwarden",
        "url": "https://frikzai-vault.duckdns.org",
        "description": "Gestionnaire de mots de passe",
        "category": "Sécurité",
    },
]

app = FastAPI(title=APP_NAME)

app.mount("/static", StaticFiles(directory="app/static"), name="static")
templates = Jinja2Templates(directory="app/templates")

async def check_service(url: str) -> dict:
    try:
        async with httpx.AsyncClient(timeout=CHECK_TIMEOUT, follow_redirects=True) as client:
            response = await client.get(url)
            return {
                "status": "UP" if response.status_code < 500 else "DOWN",
                "status_code": response.status_code,
            }
    except Exception:
        return {
            "status": "DOWN",
            "status_code": None,
        }


async def get_services_status() -> list[dict]:
    services_with_status = []

    for service in SERVICES:
        result = await check_service(service["url"])
        services_with_status.append({
            **service,
            **result,
        })

    return services_with_status


def get_disk_usage() -> dict:
    usage = shutil.disk_usage("/")
    total_gb = round(usage.total / 1024**3, 2)
    used_gb = round(usage.used / 1024**3, 2)
    free_gb = round(usage.free / 1024**3, 2)
    percent = round((usage.used / usage.total) * 100, 1)

    return {
        "total_gb": total_gb,
        "used_gb": used_gb,
        "free_gb": free_gb,
        "percent": percent,
    }


def get_container_count() -> dict:
    try:
        result = subprocess.run(
            ["docker", "ps", "--format", "{{.Names}}"],
            capture_output=True,
            text=True,
            check=True,
            timeout=3,
        )
        containers = [line for line in result.stdout.splitlines() if line.strip()]
        return {
            "running": len(containers),
            "containers": containers,
        }
    except Exception:
        return {
            "running": None,
            "containers": [],
        }


def get_latest_backup() -> dict:
    if not BACKUP_DIR.exists():
        return {
            "found": False,
            "name": None,
            "date": None,
            "size_mb": None,
        }

    archives = sorted(
        BACKUP_DIR.glob("*.tar.gz"),
        key=lambda file: file.stat().st_mtime,
        reverse=True,
    )

    if not archives:
        return {
            "found": False,
            "name": None,
            "date": None,
            "size_mb": None,
        }

    latest = archives[0]
    modified = datetime.fromtimestamp(latest.stat().st_mtime)
    size_mb = round(latest.stat().st_size / 1024**2, 2)

    return {
        "found": True,
        "name": latest.name,
        "date": modified.strftime("%Y-%m-%d %H:%M:%S"),
        "size_mb": size_mb,
    }


def get_system_info() -> dict:
    return {
        "hostname": socket.gethostname(),
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }


def get_platform_status() -> dict:
    return {
        "app_name": APP_NAME,
        "disk": get_disk_usage(),
        "docker": get_container_count(),
        "backup": get_latest_backup(),
        "system": get_system_info(),
    }


@app.get("/", response_class=HTMLResponse)
async def index(request: Request):
    services_with_status = await get_services_status()
    platform_status = get_platform_status()

    context = {
        "request": request,
        "app_name": APP_NAME,
        "services": services_with_status,
        **platform_status,
    }

    return templates.TemplateResponse("index.html", context)


@app.get("/api/status")
def api_status():
    return get_platform_status()


@app.get("/api/services")
async def api_services():
    return {
        "services": await get_services_status(),
        "generated_at": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
    }

@app.get("/health")
async def health():
    return {
        "status": "ok",
        "service": "homelab-portal",
    }
