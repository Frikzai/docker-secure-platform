async function fetchJson(url) {
    const response = await fetch(url, { cache: "no-store" });

    if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
    }

    return response.json();
}

function updateText(selector, value) {
    const element = document.querySelector(selector);

    if (element) {
        element.textContent = value;
    }
}

async function refreshStatus() {
    try {
        const status = await fetchJson("/api/status");

        if (status.docker.running !== null) {
            updateText("[data-docker-running]", status.docker.running);
        } else {
            updateText("[data-docker-running]", "Indisponible");
        }

        updateText("[data-disk-percent]", `${status.disk.percent}%`);
        updateText(
            "[data-disk-detail]",
            `${status.disk.used_gb} Go / ${status.disk.total_gb} Go`
        );

        if (status.backup.found) {
            updateText("[data-backup-size]", `${status.backup.size_mb} Mo`);
            updateText("[data-backup-date]", status.backup.date);
        } else {
            updateText("[data-backup-size]", "Aucun");
            updateText("[data-backup-date]", "Aucune archive trouvée");
        }

        updateText("[data-generated-at]", `Mis à jour : ${status.system.generated_at}`);
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du statut :", error);
    }
}

async function refreshServices() {
    try {
        const data = await fetchJson("/api/services");

        data.services.forEach((service) => {
            const card = document.querySelector(`[data-service-name="${service.name}"]`);

            if (!card) {
                return;
            }

            const badge = card.querySelector("[data-service-badge]");
            const statusCode = card.querySelector("[data-service-status-code]");

            if (badge) {
                badge.textContent = service.status;
                badge.classList.remove("up", "down");
                badge.classList.add(service.status === "UP" ? "up" : "down");
            }

            if (statusCode) {
                statusCode.textContent = service.status_code
                    ? `HTTP ${service.status_code}`
                    : "Pas de réponse";
            }
        });
    } catch (error) {
        console.error("Erreur lors du rafraîchissement des services :", error);
    }
}

async function refreshCtf() {
    try {
        await fetchJson("/api/ctf");
    } catch (error) {
        console.error("Erreur lors du rafraîchissement du CTF Lab :", error);
    }
}

async function refreshAll() {
    await refreshStatus();
    await refreshServices();
    await refreshCtf();
}

document.addEventListener("DOMContentLoaded", () => {
    refreshAll();
    setInterval(refreshAll, 30000);
});
