import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE, type SupportedLanguage } from './constants';

const supportedSet = new Set<string>(SUPPORTED_LANGUAGES);

/**
 * Maps a browser navigator.language string to a supported CellarNode language.
 * Handles regional variants (fr-CA -> fr), Chinese scripts (zh-Hans -> zh),
 * and unsupported languages (ja -> en).
 */
export function resolveLanguageFromBrowser(navigatorLanguage: string): SupportedLanguage {
  if (!navigatorLanguage || typeof navigatorLanguage !== 'string') {
    return DEFAULT_LANGUAGE;
  }

  const normalized = navigatorLanguage.toLowerCase().trim();

  // Exact match
  if (supportedSet.has(normalized)) {
    return normalized as SupportedLanguage;
  }

  // Extract base language (first segment before hyphen)
  const base = normalized.split('-')[0];
  if (supportedSet.has(base)) {
    return base as SupportedLanguage;
  }

  return DEFAULT_LANGUAGE;
}
