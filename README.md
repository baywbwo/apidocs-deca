# DECA Developer Docs

A lightweight, responsive documentation experience for DECA SNAP API. The UI uses DECA green and blue, with searchable navigation, dark mode, endpoint group pages, and a developer-first onboarding path.

## Source of truth

Endpoint paths and service codes in `app.js` are taken from the currently published DECA SNAP docs. Detailed request/response schemas remain linked to the corresponding published endpoint pages so this refresh does not invent API contracts. Before replacing the live docs, migrate the endpoint specifications into this project and verify them with DECA engineering.

## Preview

Open `index.html` in a browser or serve this directory with any static file server. No build step is required.

## Deployment

This repository does not currently include the existing `api.deca.co.id` deployment configuration. Configure the hosting target and base path before publishing this refreshed UI to the live docs domain.
