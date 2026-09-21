import { mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const base = process.env.BASE_URL ?? 'http://127.0.0.1:4321';
const outDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'qa', 'screenshots');
mkdirSync(outDir, { recursive: true });

const pages = [
  { slug: 'home', path: '/' },
  { slug: 'design-system', path: '/design-system/' },
  { slug: 'madrid', path: '/rehabilitacion-edificios/madrid/' },
  { slug: 'servicios', path: '/servicios/' },
];
const widths = [390, 768, 1440];

const browser = await chromium.launch();
for (const pageDef of pages) {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: width < 768 ? 844 : 1024 } });
    await page.goto(`${base}${pageDef.path}`, { waitUntil: 'networkidle' });
    await page.evaluate(() => {
      document.querySelector('[role="dialog"]')?.remove();
    });
    const file = join(outDir, `${pageDef.slug}-${width}.png`);
    await page.screenshot({ path: file, fullPage: true });
    await page.close();
    console.log(`saved ${file}`);
  }
}
await browser.close();
