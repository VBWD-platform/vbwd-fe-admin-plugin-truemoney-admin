# TrueMoney Admin Plugin (fe-admin)

Admin-side transactions list + refund action for TrueMoney.

## Routes

| Path | Purpose |
|------|---------|
| `/admin/truemoney/transactions` | Transactions list with refund button |

## Config

Credentials are surfaced by the core Settings → Plugins page, driven
by `vbwd-plugin-truemoney/admin-config.json`.

## Backend

Pairs with [`vbwd-plugin-truemoney`](https://github.com/VBWD-platform/vbwd-plugin-truemoney).

---

**Core:** [vbwd-fe-admin](https://github.com/VBWD-platform/vbwd-fe-admin)

## Documentation

Full platform documentation lives at **[vbwd.cc/docs](https://vbwd.cc/docs)**.

- [Frontend plugins](https://vbwd.cc/docs-frontend-plugins) — how fe-admin / fe-user plugins are built and mounted
- [Payments](https://vbwd.cc/docs-core-payments) — documentation for this plugin's domain
- [Architecture](https://vbwd.cc/docs-architecture) — platform layering and the core-agnosticism rule
- [Getting started](https://vbwd.cc/docs-getting-started) — install a VBWD instance and enable plugins
