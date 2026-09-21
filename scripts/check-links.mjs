import { readdir, readFile } from 'node:fs/promises';
import { join } from 'node:path';

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const path = join(dir, entry.name);
    if (entry.isDirectory() && entry.name !== 'node_modules' && entry.name !== 'dist') {
      files.push(...(await walk(path)));
    } else if (/\.(mdx|astro|ts|tsx)$/.test(entry.name)) {
      files.push(path);
    }
  }
  return files;
}

const files = await walk('src');
const hrefs = new Set();
for (const file of files) {
  const text = await readFile(file, 'utf8');
  for (const match of text.matchAll(/href=["'](\/[^"']+)["']/g)) hrefs.add(match[1].split('#')[0]);
  for (const match of text.matchAll(/^path:\s*["']?(\/[^"'\s]+)/gm)) hrefs.add(match[1].replace(/["']/g, ''));
}

const known = new Set([
  '/',
  '/calculadora/',
  '/precios/',
  '/provincias/',
  '/contacto/',
  '/servicios/',
  '/guias/',
  '/rehabilitacion-edificios/',
  '/design-system/',
  '/aviso-legal/',
  '/privacidad/',
  '/cookies/',
  '/afiliacion/',
  '/images/og/default.svg',
  '/favicon.svg',
  '/site.webmanifest',
]);
const contentFiles = await walk('src/content');
for (const file of contentFiles) {
  const text = await readFile(file, 'utf8');
  const path = text.match(/^path:\s*(.+)$/m)?.[1]?.trim().replace(/['"]/g, '');
  if (path) known.add(path.endsWith('/') ? path : `${path}/`);
}

const skip = (href) =>
  href.startsWith('/images') ||
  href.startsWith('/fonts') ||
  href.startsWith('/favicon') ||
  href.includes('http') ||
  href.includes('${') ||
  href.includes('{');

const missing = [...hrefs]
  .map((href) => (href.endsWith('/') || href.includes('.') ? href : `${href}/`))
  .filter((href) => href.startsWith('/') && !skip(href) && !known.has(href));

if (missing.length) {
  console.error('Broken internal paths', [...new Set(missing)]);
  process.exit(1);
}
console.log(`OK: ${known.size} known paths, ${hrefs.size} inspected hrefs`);
