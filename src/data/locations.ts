export type LocationSlug =
  | 'madrid'
  | 'barcelona'
  | 'valencia'
  | 'sevilla'
  | 'malaga'
  | 'alicante'
  | 'bizkaia'
  | 'zaragoza'
  | 'murcia'
  | 'palma'
  | 'las-palmas'
  | 'santa-cruz-tenerife'
  | 'a-coruna'
  | 'pontevedra'
  | 'asturias'
  | 'valladolid'
  | 'granada'
  | 'cordoba'
  | 'cadiz'
  | 'tarragona'
  | 'girona'
  | 'navarra'
  | 'gipuzkoa'
  | 'cantabria'
  | 'toledo'
  | 'salamanca'
  | 'leon'
  | 'almeria'
  | 'huelva'
  | 'badajoz';

export type LayoutVariant =
  | 'split-climate'
  | 'problems-first'
  | 'permits-first'
  | 'stock-first'
  | 'process-first'
  | 'budget-first';

export interface Location {
  slug: LocationSlug;
  name: string;
  region: string;
  kind: 'ciudad' | 'provincia';
  layoutId: string;
  layoutVariant: LayoutVariant;
  related: LocationSlug[];
  climate: string;
  stock: string;
  angle: string;
  permitHint: string;
  ogTint: string;
}

export const locations: Location[] = [
  {
    slug: 'madrid',
    name: 'Madrid',
    region: 'Comunidad de Madrid',
    kind: 'ciudad',
    layoutId: 'geo-rehab-01',
    layoutVariant: 'split-climate',
    related: ['toledo', 'valladolid', 'salamanca'],
    climate: 'continental con fuertes contrastes térmicos',
    stock: 'bloques de propiedad horizontal de los años 50–80 y ensanches posteriores',
    angle: 'comunidades densas, ITE y andamios en calles estrechas',
    permitHint: 'Consulta urbanismo y obras del Ayuntamiento de Madrid antes de ocupar vía pública con andamio.',
    ogTint: '#151918',
  },
  {
    slug: 'barcelona',
    name: 'Barcelona',
    region: 'Cataluña',
    kind: 'ciudad',
    layoutId: 'geo-rehab-02',
    layoutVariant: 'permits-first',
    related: ['tarragona', 'girona', 'valencia'],
    climate: 'mediterráneo húmedo',
    stock: 'Eixample, fincas modernistas y polígonos de los 60–70',
    angle: 'fachadas protegidas, humedad y ocupación de acera',
    permitHint: 'El Ayuntamiento de Barcelona distingue obras en fincas catalogadas y ocupación de vía.',
    ogTint: '#1B3A4B',
  },
  {
    slug: 'valencia',
    name: 'Valencia',
    region: 'Comunidad Valenciana',
    kind: 'ciudad',
    layoutId: 'geo-rehab-03',
    layoutVariant: 'problems-first',
    related: ['alicante', 'murcia', 'tarragona'],
    climate: 'litoral con humedad y episodios de lluvia intensa',
    stock: 'ensanches, patios interiores y edificios de costa',
    angle: 'filtraciones, patios y cubiertas planas',
    permitHint: 'Revisa ocupación de vía y licencias de fachada en el Ayuntamiento de Valencia.',
    ogTint: '#2B302E',
  },
  {
    slug: 'sevilla',
    name: 'Sevilla',
    region: 'Andalucía',
    kind: 'ciudad',
    layoutId: 'geo-rehab-04',
    layoutVariant: 'stock-first',
    related: ['cordoba', 'cadiz', 'huelva'],
    climate: 'verano muy cálido y sequedad estival',
    stock: 'casco con patios, ladrillo visto y bloques de ensanche',
    angle: 'protección solar, patios y morteros de cal',
    permitHint: 'El casco histórico puede exigir criterios de fachada distintos al resto de distritos.',
    ogTint: '#8F351F',
  },
  {
    slug: 'malaga',
    name: 'Málaga',
    region: 'Andalucía',
    kind: 'ciudad',
    layoutId: 'geo-rehab-05',
    layoutVariant: 'budget-first',
    related: ['granada', 'cadiz', 'almeria'],
    climate: 'litoral, salitre y radiación alta',
    stock: 'comunidades de costa, bloques turísticos y ensanche',
    angle: 'salitre, carpintería y cubiertas visitadas poco',
    permitHint: 'Andamios en frente litoral y comunidades con uso turístico cambian plazos y accesos.',
    ogTint: '#68736A',
  },
  {
    slug: 'alicante',
    name: 'Alicante',
    region: 'Comunidad Valenciana',
    kind: 'ciudad',
    layoutId: 'geo-rehab-06',
    layoutVariant: 'process-first',
    related: ['valencia', 'murcia', 'almeria'],
    climate: 'seco-salino con viento de levante',
    stock: 'apartamentos de segunda residencia y bloques de los 70',
    angle: 'juntas de dilatación, terrazas y comunidades poco ocupadas en invierno',
    permitHint: 'Muchas actuaciones coinciden con temporada baja: confirma ocupación de vía con el ayuntamiento.',
    ogTint: '#2B302E',
  },
  {
    slug: 'bizkaia',
    name: 'Bizkaia',
    region: 'País Vasco',
    kind: 'provincia',
    layoutId: 'geo-rehab-07',
    layoutVariant: 'split-climate',
    related: ['gipuzkoa', 'cantabria', 'navarra'],
    climate: 'atlántico húmedo y persistente',
    stock: 'ladrillo, entreplanta industrial y laderas',
    angle: 'lluvia, corrosión de herrajes y accesos en pendiente',
    permitHint: 'Bilbao y el resto de municipios tienen ordenanzas propias de andamio y fachada.',
    ogTint: '#151918',
  },
  {
    slug: 'zaragoza',
    name: 'Zaragoza',
    region: 'Aragón',
    kind: 'ciudad',
    layoutId: 'geo-rehab-08',
    layoutVariant: 'problems-first',
    related: ['navarra', 'tarragona', 'madrid'],
    climate: 'cierzo y oscilación térmica amplia',
    stock: 'ensanche de ladrillo y polígonos de vivienda',
    angle: 'juntas, cubiertas y puentes térmicos por viento',
    permitHint: 'Consulta obras y ocupación de vía en el Ayuntamiento de Zaragoza.',
    ogTint: '#2B302E',
  },
  {
    slug: 'murcia',
    name: 'Murcia',
    region: 'Región de Murcia',
    kind: 'ciudad',
    layoutId: 'geo-rehab-09',
    layoutVariant: 'stock-first',
    related: ['alicante', 'almeria', 'valencia'],
    climate: 'calor intenso y humedad de huerta en algunas zonas',
    stock: 'bloques de ensanche y comunidades de huerta urbanizada',
    angle: 'cubiertas planas, dilatación y sombreado',
    permitHint: 'El Ayuntamiento de Murcia informa de licencias de obra y ocupación de vía.',
    ogTint: '#8F351F',
  },
  {
    slug: 'palma',
    name: 'Palma',
    region: 'Illes Balears',
    kind: 'ciudad',
    layoutId: 'geo-rehab-10',
    layoutVariant: 'permits-first',
    related: ['barcelona', 'valencia', 'alicante'],
    climate: 'marino, salitre y humedad',
    stock: 'ensanche, casco y edificios de temporada',
    angle: 'protección patrimonial y corrosión marina',
    permitHint: 'El casco y determinadas fachadas pueden exigir informes previos de patrimonio.',
    ogTint: '#1B3A4B',
  },
  {
    slug: 'las-palmas',
    name: 'Las Palmas',
    region: 'Canarias',
    kind: 'ciudad',
    layoutId: 'geo-rehab-11',
    layoutVariant: 'budget-first',
    related: ['santa-cruz-tenerife', 'cadiz', 'malaga'],
    climate: 'alisios, humedad y salitre',
    stock: 'bloques de medianías y frente marítimo',
    angle: 'viento, humedad de alisio y logísticas insulares',
    permitHint: 'La insularidad encarece medios auxiliares: pide el desglose de transporte en el presupuesto.',
    ogTint: '#68736A',
  },
  {
    slug: 'santa-cruz-tenerife',
    name: 'Santa Cruz de Tenerife',
    region: 'Canarias',
    kind: 'ciudad',
    layoutId: 'geo-rehab-12',
    layoutVariant: 'process-first',
    related: ['las-palmas', 'cadiz', 'malaga'],
    climate: 'alisios, microclimas por altitud',
    stock: 'edificación en pendiente y frente portuario',
    angle: 'pendientes, viento y coordinación de accesos',
    permitHint: 'Confirma con el ayuntamiento la ocupación de aceras estrechas y vados en ladera.',
    ogTint: '#2B302E',
  },
  {
    slug: 'a-coruna',
    name: 'A Coruña',
    region: 'Galicia',
    kind: 'ciudad',
    layoutId: 'geo-rehab-13',
    layoutVariant: 'split-climate',
    related: ['pontevedra', 'asturias', 'leon'],
    climate: 'atlántico, viento y lluvia frecuente',
    stock: 'granito, galerías y ensanches',
    angle: 'galerías, viento y humedad de fachada',
    permitHint: 'Consulta urbanismo del Ayuntamiento de A Coruña para andamios en frente marítimo.',
    ogTint: '#1B3A4B',
  },
  {
    slug: 'pontevedra',
    name: 'Pontevedra',
    region: 'Galicia',
    kind: 'provincia',
    layoutId: 'geo-rehab-14',
    layoutVariant: 'problems-first',
    related: ['a-coruna', 'asturias', 'leon'],
    climate: 'lluvia persistente y humedad alta',
    stock: 'granito, Vigo y villas de ría',
    angle: 'humedad, cubiertas inclinadas y accesos en pendiente',
    permitHint: 'Vigo y el resto de ayuntamientos de la provincia tramitan ocupación de vía por separado.',
    ogTint: '#151918',
  },
  {
    slug: 'asturias',
    name: 'Asturias',
    region: 'Asturias',
    kind: 'provincia',
    layoutId: 'geo-rehab-15',
    layoutVariant: 'stock-first',
    related: ['cantabria', 'leon', 'a-coruna'],
    climate: 'cantábrico húmedo',
    stock: 'minería, ensanches de Oviedo y Gijón, ladrillo visto',
    angle: 'humedad, cubiertas y comunidades de cuesta',
    permitHint: 'Oviedo, Gijón y el resto de concejos tienen ordenanzas de obra distintas.',
    ogTint: '#2B302E',
  },
  {
    slug: 'valladolid',
    name: 'Valladolid',
    region: 'Castilla y León',
    kind: 'ciudad',
    layoutId: 'geo-rehab-16',
    layoutVariant: 'budget-first',
    related: ['salamanca', 'leon', 'madrid'],
    climate: 'invierno frío y sequedad',
    stock: 'ladrillo de ensanche y polígonos familiares',
    angle: 'puentes térmicos, cubiertas y carpintería',
    permitHint: 'El Ayuntamiento de Valladolid informa de licencias y vado de obra.',
    ogTint: '#8F351F',
  },
  {
    slug: 'granada',
    name: 'Granada',
    region: 'Andalucía',
    kind: 'ciudad',
    layoutId: 'geo-rehab-17',
    layoutVariant: 'permits-first',
    related: ['malaga', 'almeria', 'cordoba'],
    climate: 'contraste térmico y sequedad',
    stock: 'casco, ladera y ensanche',
    angle: 'protección del entorno histórico y dilatación',
    permitHint: 'Zonas próximas a conjuntos protegidos pueden exigir informe previo.',
    ogTint: '#68736A',
  },
  {
    slug: 'cordoba',
    name: 'Córdoba',
    region: 'Andalucía',
    kind: 'ciudad',
    layoutId: 'geo-rehab-18',
    layoutVariant: 'process-first',
    related: ['sevilla', 'granada', 'badajoz'],
    climate: 'verano extremo',
    stock: 'patios, cal y bloques de ensanche',
    angle: 'sombra, patios y morteros',
    permitHint: 'El casco y la Judería tienen criterios de fachada más estrictos que el ensanche.',
    ogTint: '#8F351F',
  },
  {
    slug: 'cadiz',
    name: 'Cádiz',
    region: 'Andalucía',
    kind: 'ciudad',
    layoutId: 'geo-rehab-19',
    layoutVariant: 'split-climate',
    related: ['huelva', 'sevilla', 'malaga'],
    climate: 'viento, salitre y humedad marina',
    stock: 'casco intramuros, istmo y bloques de costa',
    angle: 'salitre, viento y accesos estrechos',
    permitHint: 'El casco intramuros limita medios auxiliares y horarios de carga.',
    ogTint: '#1B3A4B',
  },
  {
    slug: 'tarragona',
    name: 'Tarragona',
    region: 'Cataluña',
    kind: 'ciudad',
    layoutId: 'geo-rehab-20',
    layoutVariant: 'problems-first',
    related: ['barcelona', 'girona', 'valencia'],
    climate: 'mediterráneo, industrial en el frente portuario',
    stock: 'casco, ensanche y polígonos costeros',
    angle: 'casco vs costa, cubiertas y fachadas al viento',
    permitHint: 'Distingue actuaciones en Part Alta y en el resto de barrios al pedir licencia.',
    ogTint: '#2B302E',
  },
  {
    slug: 'girona',
    name: 'Girona',
    region: 'Cataluña',
    kind: 'ciudad',
    layoutId: 'geo-rehab-21',
    layoutVariant: 'stock-first',
    related: ['barcelona', 'tarragona', 'zaragoza'],
    climate: 'inviernos frescos y humedad de río',
    stock: 'piedra, casco y ensanche',
    angle: 'piedra, heladas puntuales y casco',
    permitHint: 'El Barri Vell puede exigir criterios de acabado distintos al ensanche.',
    ogTint: '#151918',
  },
  {
    slug: 'navarra',
    name: 'Navarra',
    region: 'Navarra',
    kind: 'provincia',
    layoutId: 'geo-rehab-22',
    layoutVariant: 'budget-first',
    related: ['gipuzkoa', 'zaragoza', 'bizkaia'],
    climate: 'atlántico al norte y más seco al sur',
    stock: 'Pamplona, comarcas y ladrillo de ensanche',
    angle: 'dos climas en una comunidad, cubiertas y SATE',
    permitHint: 'Pamplona y el resto de ayuntamientos tramitan ocupación de vía por separado.',
    ogTint: '#68736A',
  },
  {
    slug: 'gipuzkoa',
    name: 'Gipuzkoa',
    region: 'País Vasco',
    kind: 'provincia',
    layoutId: 'geo-rehab-23',
    layoutVariant: 'permits-first',
    related: ['bizkaia', 'navarra', 'cantabria'],
    climate: 'lluvia y humedad altas',
    stock: 'pendiente, Donostia y villas costeras',
    angle: 'pendiente, lluvia y fachadas al mar',
    permitHint: 'Donostia y el resto de municipios tienen ordenanzas de andamio y patrimonio distintas.',
    ogTint: '#1B3A4B',
  },
  {
    slug: 'cantabria',
    name: 'Cantabria',
    region: 'Cantabria',
    kind: 'provincia',
    layoutId: 'geo-rehab-24',
    layoutVariant: 'process-first',
    related: ['asturias', 'bizkaia', 'leon'],
    climate: 'marino húmedo',
    stock: 'arenisca, Santander y villas de costa',
    angle: 'humedad, piedra y viento de norte',
    permitHint: 'Santander y el resto de ayuntamientos regulan la ocupación de paseos marítimos.',
    ogTint: '#2B302E',
  },
  {
    slug: 'toledo',
    name: 'Toledo',
    region: 'Castilla-La Mancha',
    kind: 'ciudad',
    layoutId: 'geo-rehab-25',
    layoutVariant: 'split-climate',
    related: ['madrid', 'badajoz', 'cordoba'],
    climate: 'calor estival y sequedad',
    stock: 'casco en cuesta y barrios de llanura',
    angle: 'casco protegido, accesos y calor',
    permitHint: 'El casco histórico limita tonos, huecos y medios auxiliares.',
    ogTint: '#8F351F',
  },
  {
    slug: 'salamanca',
    name: 'Salamanca',
    region: 'Castilla y León',
    kind: 'ciudad',
    layoutId: 'geo-rehab-26',
    layoutVariant: 'problems-first',
    related: ['valladolid', 'leon', 'toledo'],
    climate: 'heladas y sequedad',
    stock: 'arenisca, casco y ensanche universitario',
    angle: 'piedra de Villamayor, helada y casco',
    permitHint: 'El casco y la piedra local condicionan morteros y color.',
    ogTint: '#68736A',
  },
  {
    slug: 'leon',
    name: 'León',
    region: 'Castilla y León',
    kind: 'ciudad',
    layoutId: 'geo-rehab-27',
    layoutVariant: 'stock-first',
    related: ['asturias', 'valladolid', 'a-coruna'],
    climate: 'invierno frío y humedad en cubiertas',
    stock: 'ensanche, piedra y bloques de los 60–70',
    angle: 'helada, cubiertas y puentes térmicos',
    permitHint: 'Consulta el Ayuntamiento de León para andamios y vado de obra en invierno.',
    ogTint: '#151918',
  },
  {
    slug: 'almeria',
    name: 'Almería',
    region: 'Andalucía',
    kind: 'ciudad',
    layoutId: 'geo-rehab-28',
    layoutVariant: 'budget-first',
    related: ['granada', 'murcia', 'malaga'],
    climate: 'árido, radiación y viento',
    stock: 'bloques de costa y ensanche seco',
    angle: 'radiación, juntas y cubiertas planas',
    permitHint: 'El frente litoral y el casco tienen criterios distintos de ocupación de vía.',
    ogTint: '#8F351F',
  },
  {
    slug: 'huelva',
    name: 'Huelva',
    region: 'Andalucía',
    kind: 'ciudad',
    layoutId: 'geo-rehab-29',
    layoutVariant: 'process-first',
    related: ['cadiz', 'sevilla', 'badajoz'],
    climate: 'atlántico andaluz, humedad y viento',
    stock: 'ensanche, costa y barriadas',
    angle: 'humedad, cubiertas y frente onubense',
    permitHint: 'Confirma con el ayuntamiento la ocupación de aceras y el calendario de fiestas locales.',
    ogTint: '#2B302E',
  },
  {
    slug: 'badajoz',
    name: 'Badajoz',
    region: 'Extremadura',
    kind: 'ciudad',
    layoutId: 'geo-rehab-30',
    layoutVariant: 'permits-first',
    related: ['cordoba', 'sevilla', 'toledo'],
    climate: 'verano muy cálido y sequedad',
    stock: 'ensanche, ladrillo y comunidades de baja densidad',
    angle: 'calor, cubiertas y accesibilidad en bloques sin ascensor',
    permitHint: 'El Ayuntamiento de Badajoz informa de licencias de fachada y ocupación de vía.',
    ogTint: '#68736A',
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((item) => item.slug === slug);
}

export function getRelatedLocations(slug: LocationSlug): Location[] {
  const current = getLocation(slug);
  if (!current) return [];
  return current.related
    .map((relatedSlug) => getLocation(relatedSlug))
    .filter((item): item is Location => Boolean(item));
}
