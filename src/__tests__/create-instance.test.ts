import { describe, it, expect } from 'vitest';
import { createI18nInstance } from '../create-instance';
import { SUPPORTED_LANGUAGES } from '../constants';

describe('createI18nInstance', () => {
  it('returns an i18next instance', () => {
    const i18n = createI18nInstance({ ns: ['common'] });
    expect(i18n).toBeDefined();
    expect(typeof i18n.t).toBe('function');
  });

  it('sets fallback language to en', () => {
    const i18n = createI18nInstance({ ns: ['common'] });
    expect(i18n.options.fallbackLng).toEqual(['en']);
  });

  it('sets supported languages', () => {
    const i18n = createI18nInstance({ ns: ['common'] });
    expect(i18n.options.supportedLngs).toEqual([...SUPPORTED_LANGUAGES, 'cimode']);
  });

  it('respects explicit lng option', () => {
    const i18n = createI18nInstance({ ns: ['common'], lng: 'sv' });
    expect(i18n.options.lng).toBe('sv');
  });

  it('sets default namespace', () => {
    const i18n = createI18nInstance({ defaultNS: 'dashboard', ns: ['common', 'dashboard'] });
    expect(i18n.options.defaultNS).toBe('dashboard');
  });

  it('configures fallback namespace as common', () => {
    const i18n = createI18nInstance({ ns: ['common'] });
    expect(i18n.options.fallbackNS).toEqual(['common']);
  });
});
