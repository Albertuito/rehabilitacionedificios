import { readFile, writeFile } from 'node:fs/promises';
import { readdir } from 'node:fs/promises';
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

function quoteScalar(value) {
  const trimmed = value.trim();
  if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
    return trimmed;
  }
  if ((trimmed.startsWith('>') || trimmed.startsWith('|') || trimmed.startsWith('[')) && !trimmed.includes('http')) {
    return trimmed;
  }
  return `"${trimmed.replace(/\\/g, '\\\\').replace(/"/g, '\\"')}"`;
}

const files = await collect('src/content');
let changed = 0;
for (const file of files) {
  const original = await readFile(file, 'utf8');
  const parts = original.split(/^---$/m);
  if (parts.length < 3) continue;
  let fm = parts[1];
  fm = fm.replace(/^(\s*(?:-\s*)?(?:question|answer):\s*)(.+)$/gm, (_, prefix, value) => `${prefix}${quoteScalar(value)}`);
  fm = fm.replace(/^(title|description|h1|ctaLabel|answer|primaryKeyword):\s*(.+)$/gm, (full, key, value) => {
    if (key === 'answer' && full.includes('question')) return full;
    return `${key}: ${quoteScalar(value)}`;
  });
  const next = `---${fm}---${parts.slice(2).join('---')}`;
  if (next !== original) {
    await writeFile(file, next);
    changed += 1;
  }
}
console.log(`Quoted scalars in ${changed}/${files.length} files`);
