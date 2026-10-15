# DECA Developer Docs

Static documentation portal with two clear destinations: **Docs** for product and business workflows, and **API Reference** for DECA's technical contracts.

## Information architecture

- **Get Started** covers merchant onboarding, integration selection, and environments.
- **Accept Payments** covers QRIS, Virtual Account, and External Checkout.
- **Payouts** covers bank transfer, e-money top up, and batch disbursement.
- **Account & Reports** covers balance inquiry and bank statements.
- **Integration & Support** covers authentication, callbacks, testing, go-live, and troubleshooting.
- **API Reference** groups endpoint contracts by product family, then provides authentication and response-code guidance. SNAP and Non-SNAP remain clearly identified.

Published schemas and examples from the previous DECA API docs are retained. Fields or response bodies missing from the source are identified as coming soon; product availability, limits, and merchant credentials must be confirmed with DECA.

## Preview

Open `index.html` in a browser. The site is static and requires no build step.

## Deployment

The Docker image serves the static files with Nginx. `docker-compose.yml` publishes the container on port `8091`.
