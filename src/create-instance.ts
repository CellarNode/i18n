import i18next, { type i18n } from 'i18next';
import { initReactI18next } from 'react-i18next';
import HttpBackend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { SUPPORTED_LANGUAGES, DEFAULT_LANGUAGE } from './constants';
import type { I18nInstanceOptions } from './types';

/**
 * Creates and initializes an i18next instance connected to React.
 * Each frontend project calls this once in src/lib/i18n.ts.
 *
 * Uses initReactI18next to bind the instance to react-i18next,
 * enabling useTranslation() hooks to re-render on language changes.
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
    .use(initReactI18next)
    .init({
      lng,
      fallbackLng: [DEFAULT_LANGUAGE],
      supportedLngs: [...SUPPORTED_LANGUAGES],
      defaultNS,
      ns,
      fallbackNS: 'common',
      debug,
      interpolation: {
        escapeValue: false,
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
        bindI18n: 'loaded languageChanged',
        bindI18nStore: 'added',
      },
    });

  return instance;
}
