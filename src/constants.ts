export const SUPPORTED_LANGUAGES = [
  'en', 'zh', 'fr', 'de', 'it', 'es', 'sv',
] as const;

export const DEFAULT_LANGUAGE = 'en' as const;

export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_DISPLAY_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  zh: '中文',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  es: 'Español',
  sv: 'Svenska',
};
