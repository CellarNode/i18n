# @cellarnode/i18n

Shared i18n configuration for CellarNode frontends — i18next factory, browser locale detection, language display names, and common translations.

## Supported languages

```
en, zh, fr, de, it, es, sv
```

`cellarnode-public-site` adds `ru` locally — that 8th language is NOT in this lib's `SUPPORTED_LANGUAGES` constant. The public site maintains its own augmented list.

## Stack

- TypeScript 5.x. Built with `tsc`. Tested with vitest.
- Peer deps: `i18next`, `react-i18next`, `i18next-http-backend`, `i18next-browser-languagedetector`.

## Commands

```bash
pnpm install
pnpm build              # tsc only
pnpm test               # vitest run
make build              # clean + lint + typecheck + compile (PREFERRED pre-publish gate)
```

## Exports

```
@cellarnode/i18n                     # createI18nInstance, resolveLanguageFromBrowser, SUPPORTED_LANGUAGES, ...
@cellarnode/i18n/config              # Raw i18next config for advanced overrides
@cellarnode/i18n/locales/*           # JSON translation files (common.json per language)
@cellarnode/i18n/scripts/copy-common # CLI to copy lib's common.json into consumer's public/locales/
```

## Structure

```
src/
├── index.ts
├── create-instance.ts      # createI18nInstance factory (HttpBackend + LanguageDetector)
├── i18next-config.ts       # Raw config object
├── resolve-language.ts     # Browser locale → SupportedLanguage (fr-CA → fr, ja → en fallback)
├── display-names.ts        # getLanguageDisplayName, LANGUAGE_DISPLAY_NAMES (native names)
├── constants.ts            # SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE
├── types.ts                # SupportedLanguage union
├── __tests__/
└── scripts/copy-common.ts  # Build-time CLI

locales/
├── en/common.json
├── zh/common.json
└── ...                     # 7 languages
```

## copy-common pattern

Consumer wires the script into `package.json` so common locale files copy into `public/locales/` on every dev/build:

```json
{
  "scripts": {
    "predev":   "node --input-type=module -e \"import '@cellarnode/i18n/scripts/copy-common'\"",
    "prebuild": "node --input-type=module -e \"import '@cellarnode/i18n/scripts/copy-common'\""
  }
}
```

The script copies `locales/{lang}/common.json` from the installed package into the consumer's `public/locales/{lang}/common.json` so consumer-side i18next picks them up via `loadPath`.

## Translation pipeline

Per-language non-`common` namespaces are translated by `polyglot-i18n` (Gemini) on merge-to-main in consumer repos. Never edit non-English `common.json` here — fix English, let the pipeline propagate. See `polyglot-i18n/AGENTS.md`.

## Agent skills

### Issue tracker

Linear, workspace `cellarnode`, team **CellarNode** (`CEL`) — Linear MCP first,
GraphQL `issueCreate` fallback. There are no GitHub issues. See `docs/agents/issue-tracker.md`.

### Triage labels

Linear states carry `needs-triage` (`Backlog`) and `wontfix` (`Canceled`); three new labels
carry `needs-info`, `ready-for-agent`, `ready-for-human`. See `docs/agents/triage-labels.md`.

### Domain docs

Single-context. ADRs are graph-anchored RepoSkein decisions, not `docs/adr/*.md`.
See `docs/agents/domain.md`.
