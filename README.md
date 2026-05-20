# Docker Secure Platform

Plateforme Docker sécurisée déployée sur Oracle Cloud Free Tier.

L'objectif du projet est de mettre en place une plateforme auto-hébergée avec plusieurs services Docker, un reverse proxy HTTPS, une supervision simple, une gestion des sauvegardes et une documentation claire.

Ce projet est orienté administration système, exploitation Linux, Docker, sécurité et services auto-hébergés.

---

## Objectif du projet

Le but est de déployer une VM Oracle Cloud qui héberge plusieurs services Docker accessibles via HTTPS.

La plateforme doit permettre de démontrer :

- l'installation et l'administration de Docker sur Linux ;
- la gestion de services avec Docker Compose ;
- la mise en place d'un reverse proxy ;
- la gestion de certificats HTTPS Let's Encrypt ;
- la supervision de services ;
- la sécurisation d'une VM publique ;
- la sauvegarde et la restauration des volumes Docker ;
- la documentation d'une infrastructure auto-hébergée.

---

## Stack technique

- Oracle Cloud Infrastructure Free Tier
- Ubuntu Server
- Docker
- Docker Compose
- Nginx Proxy Manager
- Portainer
- Uptime Kuma
- Homepage
- Vaultwarden
- Ansible
- Terraform
- DuckDNS
- GitHub Actions

---

## Services prévus

### Nginx Proxy Manager

Nginx Proxy Manager sert de reverse proxy principal.

Il permet de :

- router les sous-domaines vers les bons conteneurs ;
- gérer les certificats HTTPS avec Let's Encrypt ;
- forcer la redirection HTTP vers HTTPS ;
- centraliser l'exposition des services web.

Exemples :

```text
frikzai-npm.duckdns.org        -> Nginx Proxy Manager
frikzai-portainer.duckdns.org  -> Portainer
frikzai-uptime.duckdns.org     -> Uptime Kuma
frikzai-home.duckdns.org       -> Homepage
frikzai-vault.duckdns.org      -> Vaultwarden
```
