# Sécurité

Ce document décrit les mesures de sécurité mises en place sur la plateforme Docker.

## Principes appliqués

- Exposer uniquement les ports nécessaires.
- Utiliser un reverse proxy unique pour les services web.
- Forcer l'accès HTTPS.
- Ne pas exposer directement les ports applicatifs Docker.
- Limiter SSH à l'adresse IP administrateur.
- Protéger SSH avec fail2ban.
- Sauvegarder régulièrement les données persistantes.
- Ne jamais versionner les secrets.

## Ports exposés

| Port | Usage | Exposition |
|---:|---|---|
| 22 | SSH | IP administrateur uniquement |
| 80 | HTTP | Public, nécessaire pour Let's Encrypt |
| 443 | HTTPS | Public |
| 81 | Ancienne interface NPM directe | Fermé après configuration |
| 9000 | Portainer | Non exposé directement |
| 3001 | Uptime Kuma | Non exposé directement |
| 3000 | Homepage | Non exposé directement |
| 80 interne | Vaultwarden | Non exposé directement |

## Oracle Cloud Security List

La Security List Oracle Cloud autorise uniquement :

- SSH depuis l'IP publique de l'administrateur 
- HTTP depuis Internet 
- HTTPS depuis Internet

Le port `81` de Nginx Proxy Manager a été utilisé temporairement pour la configuration initiale, puis fermé.

## Firewall local UFW

UFW est configuré avec une politique entrante restrictive.

Règles principales :

```text
22/tcp  ALLOW depuis IP admin
80/tcp  ALLOW public
443/tcp ALLOW public
deny incoming
allow outgoing
```
