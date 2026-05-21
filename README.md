# Docker Secure Platform

![CI](https://github.com/Frikzai/docker-secure-platform/actions/workflows/ci.yml/badge.svg)

Plateforme Docker sécurisée déployée sur Oracle Cloud Free Tier.

Ce projet met en place une plateforme auto-hébergée avec Docker Compose, Nginx Proxy Manager, HTTPS Let's Encrypt, supervision, sauvegardes automatisées, durcissement système, portail interactif FastAPI et mini-lab CTF privé.

---

## Objectif

L'objectif est de déployer une plateforme Docker complète, sécurisée et documentée sur une VM publique Oracle Cloud.

Le projet démontre :

- l'administration d'une VM Linux publique 
- le provisionnement cloud avec Terraform 
- l'installation automatisée avec Ansible 
- la gestion de services avec Docker Compose 
- la mise en place d'un reverse proxy HTTPS 
- la supervision de services web 
- la sauvegarde et la restauration de volumes Docker 
- la sécurisation d'un serveur exposé sur Internet 
- la création d'un portail web FastAPI 
- la préparation d'un mini-lab CTF privé 
- la validation automatique du projet avec GitHub Actions

---

## Stack technique

- Oracle Cloud Infrastructure Free Tier
- Ubuntu Server
- Terraform
- Ansible
- Docker
- Docker Compose
- Nginx Proxy Manager
- DuckDNS
- Let's Encrypt
- Portainer
- Uptime Kuma
- Vaultwarden
- FastAPI
- Python
- Homelab Portal
- CTF Lab privé
- UFW
- fail2ban
- systemd timers
- GitHub Actions
- GitHub Container Registry

---

## Architecture

La plateforme est hébergée sur une VM Oracle Cloud publique.

Les services applicatifs ne sont pas exposés directement sur Internet. Ils sont accessibles uniquement via Nginx Proxy Manager en HTTPS.

Le Homelab Portal sert de dashboard principal et centralise :

- l'état des services 
- les liens rapides 
- les informations Docker 
- le dernier backup 
- la section CTF Lab

```mermaid
flowchart TD
    User["Utilisateur / Administrateur"] -->|HTTPS 443| NPM["Nginx Proxy Manager"]
    Admin["Administrateur"] -->|SSH 22| VM["VM Oracle Cloud Ubuntu"]

    subgraph VM["VM Oracle Cloud"]
        Docker["Docker Engine"]
        NPM["Nginx Proxy Manager"]
        Portainer["Portainer"]
        Kuma["Uptime Kuma"]
        Portal["Homelab Portal FastAPI"]
        Vault["Vaultwarden"]
        CTF["CTF Lab privé"]
        Backup["Backups systemd"]
    end

    NPM --> Portainer
    NPM --> Kuma
    NPM --> Portal
    NPM --> Vault
    Portal --> CTF
    Backup --> Docker

## Aperçu

### Homelab-Poral

![Homepage](docs/screenshots/homelab-portal.png)

### Uptime Kuma

![Uptime Kuma](docs/screenshots/uptime-kuma.png)

### Portainer

![Portainer](docs/screenshots/portainer.png)

### Nginx Proxy Manager

![Portainer](docs/screenshots/nginx-proxy-manager.png)
