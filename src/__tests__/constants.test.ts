import { describe, it, expect } from 'vitest';
import {
  SUPPORTED_LANGUAGES,
  DEFAULT_LANGUAGE,
  LANGUAGE_DISPLAY_NAMES,
} from '../constants';

describe('SUPPORTED_LANGUAGES', () => {
  it('contains exactly 8 languages', () => {
    expect(SUPPORTED_LANGUAGES).toHaveLength(8);
  });

  it('contains all required language codes', () => {
    expect(SUPPORTED_LANGUAGES).toEqual(
      expect.arrayContaining(['en', 'zh', 'fr', 'de', 'it', 'es', 'sv', 'ru'])
    );
  });

  it('has en as the first element', () => {
    expect(SUPPORTED_LANGUAGES[0]).toBe('en');
  });
});

describe('DEFAULT_LANGUAGE', () => {
  it('is en', () => {
    expect(DEFAULT_LANGUAGE).toBe('en');
  });

  it('is included in SUPPORTED_LANGUAGES', () => {
    expect(SUPPORTED_LANGUAGES).toContain(DEFAULT_LANGUAGE);
  });
});

describe('LANGUAGE_DISPLAY_NAMES', () => {
  it('has an entry for every supported language', () => {
    for (const lang of SUPPORTED_LANGUAGES) {
      expect(LANGUAGE_DISPLAY_NAMES[lang]).toBeDefined();
    }
  });

  it('returns native display names', () => {
    expect(LANGUAGE_DISPLAY_NAMES['sv']).toBe('Svenska');
    expect(LANGUAGE_DISPLAY_NAMES['de']).toBe('Deutsch');
    expect(LANGUAGE_DISPLAY_NAMES['zh']).toBe('中文');
  });
});
