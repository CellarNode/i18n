import { describe, it, expect } from 'vitest';
import { getLanguageDisplayName } from '../display-names';

describe('getLanguageDisplayName', () => {
  it('returns native name', () => {
    expect(getLanguageDisplayName('sv')).toBe('Svenska');
    expect(getLanguageDisplayName('de')).toBe('Deutsch');
    expect(getLanguageDisplayName('zh')).toBe('中文');
    expect(getLanguageDisplayName('en')).toBe('English');
  });

  it('returns English name for unknown codes', () => {
    expect(getLanguageDisplayName('xx' as any)).toBe('English');
  });
});
