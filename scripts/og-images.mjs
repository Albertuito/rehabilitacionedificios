import { mkdir, writeFile } from 'node:fs/promises';

const cities = [
  ['madrid', '#151918', 'Madrid', 'ITE, andamios y comunidades densas'],
  ['barcelona', '#1B3A4B', 'Barcelona', 'Fachadas protegidas y humedad'],
  ['valencia', '#2B302E', 'Valencia', 'Patios, cubiertas planas y filtraciones'],
  ['sevilla', '#8F351F', 'Sevilla', 'Patios, calor y morteros'],
  ['malaga', '#68736A', 'Málaga', 'Salitre y comunidades de costa'],
  ['alicante', '#2B302E', 'Alicante', 'Terrazas y temporada baja'],
  ['bizkaia', '#151918', 'Bizkaia', 'Lluvia, herrajes y pendientes'],
  ['zaragoza', '#2B302E', 'Zaragoza', 'Cierzo, juntas y cubiertas'],
  ['murcia', '#8F351F', 'Murcia', 'Cubiertas planas y dilatación'],
  ['palma', '#1B3A4B', 'Palma', 'Salitre y patrimonio'],
  ['las-palmas', '#68736A', 'Las Palmas', 'Alisios y logística insular'],
  ['santa-cruz-tenerife', '#2B302E', 'Santa Cruz de Tenerife', 'Pendiente y viento'],
  ['a-coruna', '#1B3A4B', 'A Coruña', 'Galerías, granito y lluvia'],
  ['pontevedra', '#151918', 'Pontevedra', 'Humedad y cubiertas inclinadas'],
  ['asturias', '#2B302E', 'Asturias', 'Cantábrico y comunidades de cuesta'],
  ['valladolid', '#8F351F', 'Valladolid', 'Puentes térmicos e invierno'],
  ['granada', '#68736A', 'Granada', 'Casco, ladera y dilatación'],
  ['cordoba', '#8F351F', 'Córdoba', 'Patios, sombra y calor'],
  ['cadiz', '#1B3A4B', 'Cádiz', 'Salitre y casco intramuros'],
  ['tarragona', '#2B302E', 'Tarragona', 'Casco, costa y viento'],
  ['girona', '#151918', 'Girona', 'Piedra, casco y humedad'],
  ['navarra', '#68736A', 'Navarra', 'Dos climas y cubiertas'],
  ['gipuzkoa', '#1B3A4B', 'Gipuzkoa', 'Pendiente, lluvia y mar'],
  ['cantabria', '#2B302E', 'Cantabria', 'Piedra, humedad y norte'],
  ['toledo', '#8F351F', 'Toledo', 'Casco protegido y accesos'],
  ['salamanca', '#68736A', 'Salamanca', 'Arenisca, helada y casco'],
  ['leon', '#151918', 'León', 'Helada, cubiertas y ensanche'],
  ['almeria', '#8F351F', 'Almería', 'Radiación, juntas y cubiertas'],
  ['huelva', '#2B302E', 'Huelva', 'Atlántico andaluz y cubiertas'],
  ['badajoz', '#68736A', 'Badajoz', 'Calor, cubiertas y accesibilidad'],
];

await mkdir('public/images/og', { recursive: true });
await writeFile(
  'public/images/og/default.svg',
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#151918"/>
  <rect x="72" y="72" width="1056" height="486" fill="#F4F0E8"/>
  <rect x="72" y="470" width="280" height="88" fill="#B64A2B"/>
  <text x="110" y="220" font-size="48" font-family="Georgia, serif" fill="#151918">Rehabilita tu Edificio</text>
  <text x="110" y="290" font-size="26" font-family="Segoe UI, sans-serif" fill="#515754">Encuentra profesionales para rehabilitar tu edificio</text>
</svg>`,
);

for (const [slug, tint, name, line] of cities) {
  await writeFile(
    `public/images/og/${slug}.svg`,
    `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="${tint}"/>
  <rect x="72" y="72" width="1056" height="486" fill="#F4F0E8"/>
  <rect x="72" y="470" width="280" height="88" fill="#B64A2B"/>
  <text x="110" y="210" font-size="28" font-family="Segoe UI, sans-serif" fill="#68736A">Rehabilitación de edificios</text>
  <text x="110" y="280" font-size="54" font-family="Georgia, serif" fill="#151918">${name}</text>
  <text x="110" y="350" font-size="26" font-family="Segoe UI, sans-serif" fill="#515754">${line}</text>
</svg>`,
  );
}
console.log('OG images written');
