import { LANGUAGE_DISPLAY_NAMES, DEFAULT_LANGUAGE, type SupportedLanguage } from './constants';

/**
 * Returns the native display name for a language code.
 * e.g., "Svenska" for sv, "Deutsch" for de.
 */
export function getLanguageDisplayName(lang: SupportedLanguage): string {
  return LANGUAGE_DISPLAY_NAMES[lang] ?? LANGUAGE_DISPLAY_NAMES[DEFAULT_LANGUAGE];
}
