# Changelog

## 0.5.0 — 2026-10-14

CEL-2537 dependency sweep. Runtime dependencies moved across major versions:

- `i18next` 24.2.3 to 26.4.2 (crosses i18next 25's `changeLanguage` behaviour
  change)
- `i18next-http-backend` to 4
- `react-i18next` to 17

Consumers should smoke-test language detection before bumping, in particular
`zh` resolution and the localStorage language cache, in the importer and
producer dashboards. No change to this package's own public API.
