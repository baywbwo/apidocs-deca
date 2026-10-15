# DECA Developer Docs

Static documentation site for DECA with separate **Docs** and **API Reference** areas.

## Information architecture

- **Docs** explains product flows: Cash In, Cash Out, Account & Reports, setup, security, callbacks, testing, and go-live.
- **API Reference** groups existing endpoint specifications by the same business flows while retaining the SNAP or Non-SNAP protocol label.
- Endpoint links open the currently published DECA contract, so this site does not recreate or alter request/response schemas.
- Topics without a published DECA guide or API specification are labeled **Coming soon**.

## Preview

Open `index.html` in a browser. The site is static and requires no build step.

## Deployment

The Docker image serves the static files with Nginx. `docker-compose.yml` publishes the container on port `8091`.
