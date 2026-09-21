import { readFile, writeFile, mkdir, readdir } from 'node:fs/promises';
import { join } from 'node:path';

function shingles(text, size = 5) {
  const words = text
    .toLowerCase()
    .replace(/<[^>]+>/g, ' ')
    .replace(/[^a-záéíóúüñ0-9\s]/gi, ' ')
    .split(/\s+/)
    .filter(Boolean);
  const set = new Set();
  for (let i = 0; i <= words.length - size; i += 1) set.add(words.slice(i, i + size).join(' '));
  return set;
}

function jaccard(a, b) {
  const inter = [...a].filter((item) => b.has(item)).length;
  const union = new Set([...a, ...b]).size;
  return union === 0 ? 0 : inter / union;
}

function parseFrontmatter(raw) {
  const match = raw.match(/^---\n([\s\S]*?)\n---/);
  const block = match?.[1] ?? '';
  const get = (key) =>
    block
      .split('\n')
      .find((item) => item.startsWith(`${key}:`))
      ?.slice(key.length + 1)
      .trim()
      .replace(/^['"]|['"]$/g, '') ?? '';
  const faqs = [...block.matchAll(/question:\s*(.+)/g)].map((item) => item[1].trim());
  return {
    layoutId: get('layoutId'),
    heroVariant: get('heroVariant'),
    description: get('description'),
    faqs: faqs.join('|'),
    body: raw.replace(/^---[\s\S]*?---/, ''),
  };
}

const dir = 'src/content/locations';
const files = (await readdir(dir)).filter((name) => name.endsWith('.mdx')).map((name) => join(dir, name));
const docs = await Promise.all(files.map(async (file) => ({ file, ...parseFrontmatter(await readFile(file, 'utf8')) })));

const duplicates = [];
for (const key of ['layoutId', 'heroVariant', 'description', 'faqs']) {
  const seen = new Map();
  for (const doc of docs) {
    const value = doc[key];
    if (!value) continue;
    if (seen.has(value)) duplicates.push({ key, value, files: [seen.get(value), doc.file] });
    else seen.set(value, doc.file);
  }
}

const pairs = [];
for (let i = 0; i < docs.length; i += 1) {
  for (let j = i + 1; j < docs.length; j += 1) {
    pairs.push({ a: docs[i].file, b: docs[j].file, score: jaccard(shingles(docs[i].body), shingles(docs[j].body)) });
  }
}
pairs.sort((a, b) => b.score - a.score);
const tooSimilar = pairs.filter((item) => item.score > 0.18);

await mkdir('reports', { recursive: true });
await writeFile('reports/content-similarity.json', JSON.stringify({ duplicates, closest: pairs.slice(0, 15), tooSimilar }, null, 2));

if (duplicates.length || tooSimilar.length) {
  console.error('Content uniqueness check failed', { duplicates, tooSimilar });
  process.exit(1);
}
console.log(`OK: ${docs.length} geo pages unique. Closest Jaccard ${pairs[0]?.score.toFixed(3) ?? 'n/a'}`);
