# @cellarnode/i18n

Shared i18n configuration for CellarNode frontends — language constants, i18next factory, browser locale detection, and common translations.

## Install

```bash
pnpm add @cellarnode/i18n react-i18next i18next i18next-http-backend i18next-browser-languagedetector
```

## Usage

### Initialize i18next

```ts
// src/lib/i18n.ts
import { createI18nInstance } from "@cellarnode/i18n";

const i18n = createI18nInstance({
  defaultNS: "common",
  ns: ["common", "navigation"],
  loadPath: "/locales/{{lng}}/{{ns}}.json",
});

export default i18n;
```

### Wrap your app

```tsx
import { I18nextProvider } from "react-i18next";
import i18n from "@/lib/i18n";

function App() {
  return (
    <I18nextProvider i18n={i18n}>
      <YourApp />
    </I18nextProvider>
  );
}
```

### Translate strings

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation("common");
  return <button>{t("save")}</button>;
}
```

### Detect browser language

```ts
import { resolveLanguageFromBrowser } from "@cellarnode/i18n";

// Maps regional variants to supported languages
resolveLanguageFromBrowser("fr-CA"); // "fr"
resolveLanguageFromBrowser("zh-Hans-CN"); // "zh"
resolveLanguageFromBrowser("ja"); // "en" (fallback)
```

### Copy common translations (build script)

Add to your `package.json` scripts to copy shared `common.json` files into your project:

```json
{
  "scripts": {
    "predev": "node --input-type=module -e \"import '@cellarnode/i18n/scripts/copy-common'\"",
    "prebuild": "node --input-type=module -e \"import '@cellarnode/i18n/scripts/copy-common'\""
  }
}
```

This copies `locales/{lang}/common.json` from the installed package into `public/locales/{lang}/common.json`.

## Exports

### `@cellarnode/i18n`

| Export | Description |
|--------|-------------|
| `createI18nInstance(options)` | i18next factory with HttpBackend + LanguageDetector |
| `resolveLanguageFromBrowser(locale)` | Maps browser locale to supported language |
| `getLanguageDisplayName(lang)` | Returns native display name (e.g., "Svenska") |
| `SUPPORTED_LANGUAGES` | `['en', 'zh', 'fr', 'de', 'it', 'es', 'sv']` |
| `DEFAULT_LANGUAGE` | `'en'` |
| `LANGUAGE_DISPLAY_NAMES` | Map of codes to native names |
| `SupportedLanguage` | TypeScript union type |

### `@cellarnode/i18n/locales/*`

JSON translation files for all 7 languages. Currently includes `common.json`.

### `@cellarnode/i18n/scripts/copy-common`

CLI script that copies common locale files from the package into `public/locales/`.

## Supported Languages

| Code | Language | Native |
|------|----------|--------|
| `en` | English | English |
| `zh` | Chinese (Simplified) | 中文 |
| `fr` | French | Francais |
| `de` | German | Deutsch |
| `it` | Italian | Italiano |
| `es` | Spanish | Espanol |
| `sv` | Swedish | Svenska |

## License

MIT
