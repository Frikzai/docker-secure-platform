# Docker Secure Platform

Plateforme Docker sécurisée déployée sur Oracle Cloud Free Tier.

L'objectif du projet est de mettre en place une plateforme auto-hébergée basée sur Docker, avec un reverse proxy HTTPS, une exposition contrôlée des services, une supervision applicative et une stratégie de sauvegarde.

Ce projet est orienté administration Linux, Docker, sécurité, reverse proxy et exploitation de services auto-hébergés.

---

## Objectif du projet

Le but est de déployer une VM Oracle Cloud qui héberge plusieurs services Docker accessibles proprement via HTTPS.

La plateforme doit permettre de démontrer :

- l'administration d'une VM Linux publique 
- l'installation automatisée de Docker avec Ansible 
- l'utilisation de Docker Compose 
- la mise en place d'un reverse proxy avec Nginx Proxy Manager 
- la gestion de certificats HTTPS avec Let's Encrypt 
- la configuration DNS avec DuckDNS 
- la sécurisation des ports exposés 
- la préparation d'une future supervision et sauvegarde

---

## État actuel du projet

À ce stade, les éléments suivants sont fonctionnels :

- VM Oracle Cloud Free Tier créée avec Terraform 
- accès SSH opérationnel 
- Docker installé via Ansible 
- Docker Compose installé 
- dossier applicatif `/opt/docker-secure-platform` créé 
- Nginx Proxy Manager déployé avec Docker Compose 
- sous-domaine DuckDNS configuré pour Nginx Proxy Manager 
- accès HTTPS à Nginx Proxy Manager fonctionnel 
- port d'administration `81` commenté côté Terraform après configuration
- Portainer déployé avec Docker Compose 
- Portainer accessible en HTTPS via Nginx Proxy Manager 
- Portainer non exposé directement sur Internet 
- gestion Docker accessible depuis une interface web sécurisée
- Uptime Kuma déployé avec Docker Compose 
- Uptime Kuma accessible en HTTPS via Nginx Proxy Manager 
- supervision de Nginx Proxy Manager, Portainer et Uptime Kuma 
- Uptime Kuma non exposé directement sur Internet
- Homepage déployé avec Docker Compose 
- Homepage accessible en HTTPS via Nginx Proxy Manager 
- dashboard centralisant les liens vers les services 
- Homepage supervisé avec Uptime Kuma 
- Homepage non exposé directement sur Internet
- Vaultwarden déployé avec Docker Compose 
- Vaultwarden accessible en HTTPS via Nginx Proxy Manager 
- inscriptions publiques désactivées après création du compte principal 
- interface admin protégée par un token 
- Vaultwarden non exposé directement sur Internet 
- Vaultwarden ajouté dans Homepage et Uptime Kuma
- sécurisation système de la VM avec UFW 
- SSH limité à l'adresse IP administrateur 
- fail2ban actif pour protéger SSH 
- durcissement SSH appliqué 
- rpcbind désactivé 
- seuls les ports 22, 80 et 443 sont nécessaires
- sauvegardes automatisées des volumes Docker 
- timer systemd quotidien 
- script de test de restauration 
- archives conservées dans `/opt/backups/docker-secure-platform`
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
- Git / GitHub

---

### Portainer

Portainer est déployé derrière Nginx Proxy Manager.

Il est accessible via :

```text
https://frikzai-portainer.duckdns.org
```

---

### Uptime Kuma

Uptime Kuma est déployé derrière Nginx Proxy Manager.

Il est accessible via :

```text
https://frikzai-uptime.duckdns.org
```

---

### Homepage

Homepage est déployé derrière Nginx Proxy Manager.

Il est accessible via :

```text
https://frikzai-home.duckdns.org
```

---

### Vaultwarden

Vaultwarden est déployé derrière Nginx Proxy Manager.

Il est accessible via :

```text
https://frikzai-vault.duckdns.org
```

---

## Sécurité système

La VM est sécurisée avec plusieurs couches :

- Security List Oracle Cloud 
- firewall local UFW 
- SSH par clé uniquement 
- connexion root désactivée 
- authentification par mot de passe désactivée 
- fail2ban activé sur SSH 
- port 81 fermé après configuration de Nginx Proxy Manager 
- services applicatifs accessibles uniquement via HTTPS

---

## Sauvegardes

Les données persistantes Docker sont sauvegardées automatiquement.

Dossier sauvegardé :

```text
/opt/docker-secure-platform/data/
```

---
