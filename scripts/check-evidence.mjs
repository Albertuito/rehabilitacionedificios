import { readFile } from 'node:fs/promises';
import { parse } from 'yaml';

const file = new URL('../src/data/evidence.yml', import.meta.url);
const parsed = parse(await readFile(file, 'utf8'));
const items = parsed?.items ?? [];
const now = new Date();
const invalid = items.filter((item) => item.status === 'verified' && new Date(item.expiresAt) <= now);
if (invalid.length) {
  console.error('Expired verified evidence', invalid);
  process.exit(1);
}
console.log(`OK: ${items.length} evidence records`);
