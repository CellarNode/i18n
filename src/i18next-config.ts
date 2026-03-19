import { SUPPORTED_LANGUAGES } from './constants.js';

/**
 * Shared i18next-cli config for all CellarNode frontend repos.
 * Re-export from your project's i18next.config.ts:
 *
 * ```ts
 * export { default } from '@cellarnode/i18n/config';
 * ```
 */
export default {
  locales: [...SUPPORTED_LANGUAGES],
  defaultLocale: 'en',
  extract: {
    input: ['src/**/*.{ts,tsx}'],
    output: 'public/locales/{{language}}/{{namespace}}.json',
    defaultNamespace: 'common',
  },
  lint: {
    enabled: true,
  },
};
