export interface ServiceDef {
  slug: string;
  path: string;
  name: string;
  navLabel: string;
  short: string;
  problem: string;
}

export const services: ServiceDef[] = [
  {
    slug: 'rehabilitacion-integral-edificios',
    path: '/servicios/rehabilitacion-integral-edificios/',
    name: 'Rehabilitación integral de edificios',
    navLabel: 'Integral',
    short: 'Fachada, cubierta, instalaciones comunes y accesos en una misma actuación coordinada.',
    problem: 'El edificio acumula varias deficiencias y conviene ordenarlas en un solo proyecto.',
  },
  {
    slug: 'rehabilitacion-fachadas',
    path: '/servicios/rehabilitacion-fachadas/',
    name: 'Rehabilitación de fachadas',
    navLabel: 'Fachadas',
    short: 'Revestimientos, anclajes, desprendimientos y seguridad de la envolvente.',
    problem: 'Desprendimientos, fisuras o revestimiento agotado en la fachada.',
  },
  {
    slug: 'reparacion-cubiertas-tejados',
    path: '/servicios/reparacion-cubiertas-tejados/',
    name: 'Reparación de cubiertas y tejados',
    navLabel: 'Cubiertas',
    short: 'Tejas, petos, encuentros y evacuación de agua en cubierta inclinada o plana.',
    problem: 'Goteras, tejas sueltas o encuentros deteriorados.',
  },
  {
    slug: 'impermeabilizacion-cubiertas',
    path: '/servicios/impermeabilizacion-cubiertas/',
    name: 'Impermeabilización de cubiertas',
    navLabel: 'Impermeabilización',
    short: 'Láminas, pendientes y puntos singulares para cortar filtraciones.',
    problem: 'Filtraciones reiteradas pese a parches locales.',
  },
  {
    slug: 'aislamiento-sate',
    path: '/servicios/aislamiento-sate/',
    name: 'Aislamiento SATE',
    navLabel: 'SATE',
    short: 'Sistema de aislamiento térmico por el exterior con revestimiento continuo.',
    problem: 'Pérdida de calor, condensaciones o fachada que ya hay que intervenir.',
  },
  {
    slug: 'rehabilitacion-energetica',
    path: '/servicios/rehabilitacion-energetica/',
    name: 'Rehabilitación energética',
    navLabel: 'Energética',
    short: 'Envolvente, huecos e instalaciones comunes para reducir demanda.',
    problem: 'Facturas altas, IEE desfavorable o objetivo de mejora energética.',
  },
  {
    slug: 'refuerzo-estructural',
    path: '/servicios/refuerzo-estructural/',
    name: 'Refuerzo estructural',
    navLabel: 'Estructura',
    short: 'Diagnóstico y refuerzo de forjados, pilares o cantos cuando hay daño estructural.',
    problem: 'Fisuras de origen estructural o informe que pide refuerzo.',
  },
  {
    slug: 'reparacion-grietas',
    path: '/servicios/reparacion-grietas/',
    name: 'Reparación de grietas',
    navLabel: 'Grietas',
    short: 'Distinguir grieta de retracción, asiento o daño estructural antes de tapar.',
    problem: 'Grietas visibles en fachada, patio o caja de escalera.',
  },
  {
    slug: 'accesibilidad-comunidades',
    path: '/servicios/accesibilidad-comunidades/',
    name: 'Accesibilidad en comunidades',
    navLabel: 'Accesibilidad',
    short: 'Ascensor, rampas, portales y supresión de barreras en zonas comunes.',
    problem: 'Escalones de portal, ausencia de ascensor o ITE que señala barreras.',
  },
  {
    slug: 'reforma-patios-interiores',
    path: '/servicios/reforma-patios-interiores/',
    name: 'Patios y zonas comunes',
    navLabel: 'Patios',
    short: 'Pavimentos, bajantes vistas, iluminación y revestimientos de patio.',
    problem: 'Patio degradado, humedad de bajantes o solado en mal estado.',
  },
  {
    slug: 'sustitucion-bajantes',
    path: '/servicios/sustitucion-bajantes/',
    name: 'Sustitución de bajantes',
    navLabel: 'Bajantes',
    short: 'Redes verticales de evacuación, arquetas y encuentros con cubierta.',
    problem: 'Fugas, olores o fibrocemento en mal estado.',
  },
  {
    slug: 'ite-iee',
    path: '/servicios/ite-iee/',
    name: 'ITE e IEE',
    navLabel: 'ITE / IEE',
    short: 'Inspección técnica del edificio e informe de evaluación energética.',
    problem: 'Requerimiento municipal, edificio que cumple edad o venta que pide IEE.',
  },
];

export function getService(slug: string): ServiceDef | undefined {
  return services.find((item) => item.slug === slug);
}
