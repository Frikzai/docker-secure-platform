# Docker Secure Platform

Plateforme Docker sécurisée déployée sur Oracle Cloud Free Tier.

L'objectif du projet est de mettre en place une plateforme auto-hébergée basée sur Docker, avec un reverse proxy HTTPS, une exposition contrôlée des services, une supervision applicative et une stratégie de sauvegarde.

Ce projet est orienté administration Linux, Docker, sécurité, reverse proxy et exploitation de services auto-hébergés.

---

## Objectif du projet

Le but est de déployer une VM Oracle Cloud qui héberge plusieurs services Docker accessibles proprement via HTTPS.

La plateforme doit permettre de démontrer :

- l'administration d'une VM Linux publique ;
- l'installation automatisée de Docker avec Ansible ;
- l'utilisation de Docker Compose ;
- la mise en place d'un reverse proxy avec Nginx Proxy Manager ;
- la gestion de certificats HTTPS avec Let's Encrypt ;
- la configuration DNS avec DuckDNS ;
- la sécurisation des ports exposés ;
- la préparation d'une future supervision et sauvegarde.

---

## État actuel du projet

À ce stade, les éléments suivants sont fonctionnels :

- VM Oracle Cloud Free Tier créée avec Terraform ;
- accès SSH opérationnel ;
- Docker installé via Ansible ;
- Docker Compose installé ;
- dossier applicatif `/opt/docker-secure-platform` créé ;
- Nginx Proxy Manager déployé avec Docker Compose ;
- sous-domaine DuckDNS configuré pour Nginx Proxy Manager ;
- accès HTTPS à Nginx Proxy Manager fonctionnel ;
- port d'administration `81` commenté côté Terraform après configuration.

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
