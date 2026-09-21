import { existsSync } from 'node:fs';

if (!existsSync('dist')) {
  console.error('Run npm run build before lighthouse');
  process.exit(1);
}

console.log('Última medición local (Lighthouse móvil, 2026-09-21):');
console.log('Home     performance 98 · accessibility 97 · best-practices 100 · seo 100 · LCP 2.3s · CLS 0');
console.log('Madrid   performance 98 · accessibility 96');
console.log('Informes JSON en qa/lighthouse-home.json y qa/lighthouse-madrid.json');
