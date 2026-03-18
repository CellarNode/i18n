import type { SupportedLanguage } from './constants';

export type TranslationNamespace = string;

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
