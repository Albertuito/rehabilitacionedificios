import { readdir, writeFile } from 'node:fs/promises';
import { join, relative } from 'node:path';

async function walk(dir) {
  const files = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules') files.push(...(await walk(path)));
    else if (/\.(astro|tsx)$/.test(entry.name)) files.push(path);
  }
  return files;
}

const files = (await walk('src')).sort();
const lines = files.map((file) => `@source "${relative('src/styles', file).replaceAll('\\', '/')}";`);
await writeFile('src/styles/tw-sources.css', `${lines.join('\n')}\n`);
console.log(`Wrote ${files.length} Tailwind sources`);
