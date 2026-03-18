import { cpSync, mkdirSync, existsSync, readdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { createRequire } from 'node:module';

// Resolve the locales directory relative to the installed package,
// NOT relative to import.meta.url (which is wrong when run via `node -e`)
const require = createRequire(import.meta.url);
const pkgDir = dirname(require.resolve('@cellarnode/i18n/package.json'));
const localesSource = join(pkgDir, 'locales');
const targetDir = join(process.cwd(), 'public', 'locales');

const languages = readdirSync(localesSource).filter(
  (f) => !f.startsWith('.')
);

for (const lang of languages) {
  const src = join(localesSource, lang, 'common.json');
  const dest = join(targetDir, lang, 'common.json');

  if (existsSync(src)) {
    mkdirSync(dirname(dest), { recursive: true });
    cpSync(src, dest);
    console.log(`Copied common.json -> ${lang}`);
  }
}

console.log(`Done. Copied ${languages.length} locale files.`);
