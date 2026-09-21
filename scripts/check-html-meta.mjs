import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function walk(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const path = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await walk(path)));
    else if (entry.name === 'index.html') out.push(path);
  }
  return out;
}

const files = await walk('dist');
const problems = [];
let checked = 0;
for (const file of files) {
  const html = await readFile(file, 'utf8');
  if (html.includes('Redirecting to:')) continue;
  checked += 1;
  const missing = [];
  if (!/<title>[^<]+<\/title>/.test(html)) missing.push('title');
  if (!/name="description" content="[^"]+"/.test(html)) missing.push('description');
  if (!/rel="canonical" href="[^"]+"/.test(html)) missing.push('canonical');
  if (!/<h1\b/.test(html)) missing.push('h1');
  const h1count = (html.match(/<h1\b/g) || []).length;
  if (h1count > 1) missing.push(`multiple-h1:${h1count}`);
  if (missing.length) problems.push(`${file} => ${missing.join(',')}`);
}

if (problems.length) {
  console.error(problems.join('\n'));
  process.exit(1);
}
console.log(`OK: ${checked} pages with title, description, canonical and single H1`);
