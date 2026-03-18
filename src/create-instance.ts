import i18next, { type i18n } from 'i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './constants';
import type { I18nInstanceOptions } from './types';

/**
 * Creates and initializes an i18next instance.
 * Each frontend project calls this once in src/lib/i18n.ts.
 *
 * NOTE: init() is called on the instance but translation loading is async.
 * Options (fallbackLng, supportedLngs, etc.) are set immediately.
 * Translations load in the background via i18next-http-backend.
 * react-i18next handles the loading state via its `ready` prop / Suspense.
 */
export function createI18nInstance(options: I18nInstanceOptions): i18n {
  const {
    defaultNS = 'common',
    ns = ['common'],
    loadPath = '/locales/{{lng}}/{{ns}}.json',
    lng,
    debug = false,
  } = options;

  const instance = i18next.createInstance();

  instance
    .use(HttpBackend)
    .use(LanguageDetector)
    .init({
      lng,
      fallbackLng: [DEFAULT_LANGUAGE],
      supportedLngs: [...SUPPORTED_LANGUAGES],
      defaultNS,
      ns,
      fallbackNS: 'common',
      debug,
      interpolation: {
        escapeValue: false, // React already escapes
      },
      detection: {
        order: ['localStorage', 'navigator'],
        lookupLocalStorage: 'cellarnode-language',
        caches: ['localStorage'],
      },
      backend: {
        loadPath,
      },
      react: {
        useSuspense: false,
      },
    });

  return instance;
}
