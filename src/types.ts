import type { SupportedLanguage } from './constants';

export type TranslationNamespace = string;

/**
 * Loose `t` type for utility helpers that take a translation function as a
 * parameter. Use this instead of i18next's `TFunction` so helpers aren't
 * coupled to a specific namespace — callers from any `useTranslation(<ns>)`
 * site can pass their `t` via `t as Translate`. The cast is safe for the
 * normal interpolation-only call shapes below (returning a string); it
 * sheds the namespace-specific resource-key type-checking, which utility
 * helpers don't need.
 *
 * Mirrors i18next's four core call shapes so existing call sites compile:
 *
 *   t(key)
 *   t(key, options)             // options-object form
 *   t(key, defaultValue)        // default-string form
 *   t(key, defaultValue, options)
 *
 * `defaultValueOrOptions` accepts `undefined` so that values like
 * `Record<string, string | number> | undefined` (e.g. badge interpolation
 * maps) flow through without a non-null assertion at the call site.
 *
 * Known limitation: i18next's `t` can return a non-string when the
 * `returnDetails: true` or `returnObjects: true` options are set. Calling
 * `(t as Translate)(key, { returnDetails: true })` would type the result
 * as `string` while the runtime returns a `TFunctionDetailedResult`.
 * Utility helpers wrapped under `Translate` should not use those options;
 * if you need them, keep the original `TFunction` typing instead of
 * casting.
 *
 * Background: introduced locally in producer-dashboard via CEL-390 step 3
 * to fix the TFunction-namespace-bleed TS2345 cluster, then hoisted here
 * via CEL-451 so importer + admin-v2 can adopt the same idiom without
 * forking the type definition.
 */
export type Translate = (
  key: string,
  defaultValueOrOptions?: string | Record<string, unknown>,
  options?: Record<string, unknown>,
) => string;

export interface I18nInstanceOptions {
  /** Default namespace to use */
  defaultNS?: string;
  /** Namespaces to load */
  ns?: string[];
  /** Path template for loading translations. Use {{lng}} and {{ns}} placeholders. */
  loadPath?: string;
  /** Initial language (overrides detection) */
  lng?: SupportedLanguage;
  /** Enable debug logging */
  debug?: boolean;
}
