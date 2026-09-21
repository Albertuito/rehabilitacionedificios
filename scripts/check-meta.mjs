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
const titles = new Map();
const descriptions = new Map();
const dup = [];
for (const file of files) {
  const text = await readFile(file, 'utf8');
  const title = text.match(/^title:\s*(.+)$/m)?.[1]?.trim();
  const description = text.match(/^description:\s*(.+)$/m)?.[1]?.trim();
  if (title && titles.has(title)) dup.push({ field: 'title', value: title, files: [titles.get(title), file] });
  else if (title) titles.set(title, file);
  if (description && descriptions.has(description)) {
    dup.push({ field: 'description', value: description, files: [descriptions.get(description), file] });
  } else if (description) descriptions.set(description, file);
  if (title && title.replace(/['"]/g, '').length > 70) {
    console.warn('Long title', file, title.length);
  }
}
if (dup.length) {
  console.error('Duplicate meta', dup);
  process.exit(1);
}
console.log(`OK: ${files.length} titles and descriptions unique`);
