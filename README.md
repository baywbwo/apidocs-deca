# DECA Developer Docs

Static documentation site for DECA with separate **Docs** and **API Reference** areas.

## Information architecture

- **Docs** explains product flows: Cash In, Cash Out, Account & Reports, setup, security, callbacks, testing, and go-live.
- **API Reference** groups endpoint detail pages by Cash In, Cash Out, Account & Reports, and authentication while retaining the SNAP or Non-SNAP protocol label.
- Endpoint pages in this portal show the verified DECA method, path, service code, request and response fields, and examples where available.
- Contract sections that have not been migrated or verified are labeled **Coming soon**. The portal does not redirect endpoint details to the previous documentation site.

## Preview

Open `index.html` in a browser. The site is static and requires no build step.

## Deployment

The Docker image serves the static files with Nginx. `docker-compose.yml` publishes the container on port `8091`.
