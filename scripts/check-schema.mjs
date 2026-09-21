import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function collect(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...(await collect(path)));
    else if (path.endsWith('.mdx')) files.push(path);
  }
  return files;
}

const files = await collect('src/content');
let errors = 0;
for (const file of files) {
  const text = await readFile(file, 'utf8');
  if (/AggregateRating|reviewCount|best of/i.test(text) && !/evidence/i.test(text)) {
    console.error('Possible unverified claim in', file);
    errors += 1;
  }
  if (!text.includes('faqs:')) {
    console.error('Missing FAQs', file);
    errors += 1;
  }
}
if (errors) process.exit(1);
console.log('OK: schema-related content checks passed');
