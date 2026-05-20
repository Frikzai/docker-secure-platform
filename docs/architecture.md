# Architecture

Ce projet déploie une plateforme Docker sécurisée sur une VM Oracle Cloud Free Tier.

## Vue d'ensemble

```mermaid
flowchart TD
    User["Administrateur<br/>WSL2 / SSH / Navigateur"] -->|SSH 22| VM["VM Oracle Cloud<br/>Ubuntu Server<br/>144.24.196.38"]

    Internet["Internet"] -->|HTTP 80 / HTTPS 443| NPM["Nginx Proxy Manager<br/>Reverse Proxy HTTPS"]

    subgraph OCI["Oracle Cloud Infrastructure"]
        subgraph Compute["VM publique Ubuntu"]
            VM
            Docker["Docker Engine"]
            NPM
            Portainer["Portainer<br/>Gestion Docker"]
            Kuma["Uptime Kuma<br/>Supervision"]
            Homepage["Homepage<br/>Dashboard"]
            Vaultwarden["Vaultwarden<br/>Password Manager"]
            Backups["Backups<br/>/opt/backups/docker-secure-platform"]
        end
    end

    VM --> Docker
    Docker --> NPM
    NPM -->|Proxy Host| Portainer
    NPM -->|Proxy Host| Kuma
    NPM -->|Proxy Host| Homepage
    NPM -->|Proxy Host| Vaultwarden

    Kuma -->|Checks HTTPS| NPM
    Kuma -->|Checks HTTPS| Portainer
    Kuma -->|Checks HTTPS| Homepage
    Kuma -->|Checks HTTPS| Vaultwarden

    Backups -->|Archives .tar.gz| Docker

    DNS["DuckDNS"] --> NPM
