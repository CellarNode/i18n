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
    ignore: [
      'src/components/ui/**',       // shadcn/ui primitives — don't instrument
      'src/hooks/**',               // hooks — no user-facing text
      'src/lib/**',                 // utilities, API clients
      'src/providers/**',           // context providers
      'src/integrations/**',        // third-party integrations
      'src/assets/**',              // static assets
      'src/__tests__/**',           // test files
      'src/routeTree.gen.ts',       // auto-generated route tree
    ],
  },
  lint: {
    enabled: true,
    ignore: [
      'src/components/ui/**',
      'src/hooks/**',
      'src/lib/**',
      'src/providers/**',
      'src/integrations/**',
      'src/@types/**',
      'src/routeTree.gen.ts',
      'src/assets/**',
    ],
    // Attributes that often contain brand names, URLs, or non-translatable identifiers
    ignoredAttributes: [
      'href',
      'src',
      'target',
      'rel',
      'type',
      'id',
      'name',
      'className',
      'htmlFor',
      'role',
      'viewBox',
      'd',  // SVG path data
    ],
    // Tags whose text content is typically not user-facing prose
    ignoredTags: [
      'code',
      'pre',
      'script',
      'style',
      'svg',
      'path',
    ],
  },
};
