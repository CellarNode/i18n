import { describe, it, expect } from 'vitest';
import { resolveLanguageFromBrowser } from '../resolve-language';

describe('resolveLanguageFromBrowser', () => {
  it('returns exact match for supported language', () => {
    expect(resolveLanguageFromBrowser('en')).toBe('en');
    expect(resolveLanguageFromBrowser('sv')).toBe('sv');
    expect(resolveLanguageFromBrowser('fr')).toBe('fr');
  });

  it('maps regional variants to base language', () => {
    expect(resolveLanguageFromBrowser('fr-CA')).toBe('fr');
    expect(resolveLanguageFromBrowser('de-AT')).toBe('de');
    expect(resolveLanguageFromBrowser('de-CH')).toBe('de');
    expect(resolveLanguageFromBrowser('es-MX')).toBe('es');
    expect(resolveLanguageFromBrowser('es-AR')).toBe('es');
  });

  it('maps all Chinese variants to zh', () => {
    expect(resolveLanguageFromBrowser('zh')).toBe('zh');
    expect(resolveLanguageFromBrowser('zh-CN')).toBe('zh');
    expect(resolveLanguageFromBrowser('zh-TW')).toBe('zh');
    expect(resolveLanguageFromBrowser('zh-Hans')).toBe('zh');
    expect(resolveLanguageFromBrowser('zh-Hant')).toBe('zh');
    expect(resolveLanguageFromBrowser('zh-Hans-CN')).toBe('zh');
  });

  it('returns en for unsupported languages', () => {
    expect(resolveLanguageFromBrowser('ja')).toBe('en');
    expect(resolveLanguageFromBrowser('ko')).toBe('en');
    expect(resolveLanguageFromBrowser('ar')).toBe('en');
    expect(resolveLanguageFromBrowser('pt-BR')).toBe('en');
  });

  it('handles empty, null, and undefined input', () => {
    expect(resolveLanguageFromBrowser('')).toBe('en');
    expect(resolveLanguageFromBrowser(null as any)).toBe('en');
    expect(resolveLanguageFromBrowser(undefined as any)).toBe('en');
  });

  it('is case-insensitive', () => {
    expect(resolveLanguageFromBrowser('EN')).toBe('en');
    expect(resolveLanguageFromBrowser('Fr-ca')).toBe('fr');
    expect(resolveLanguageFromBrowser('ZH-HANS')).toBe('zh');
  });
});
