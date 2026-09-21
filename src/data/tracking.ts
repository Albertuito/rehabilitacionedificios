import { locations } from './locations';
import { services } from './services';

export interface ClickRefRecord {
  clickref: string;
  page: string;
  placement: string;
  service?: string;
  location?: string;
  label: string;
}

const rows: ClickRefRecord[] = [
  { clickref: 'home_hero_rehabilitacion', page: '/', placement: 'hero', label: 'Solicitar presupuestos gratis' },
  { clickref: 'home_mid_proceso', page: '/', placement: 'proceso', label: 'Solicitar presupuestos para mi edificio' },
  { clickref: 'home_calculator_result', page: '/', placement: 'calculator', label: 'Obtén presupuestos adaptados a tu edificio' },
  { clickref: 'home_final_cta', page: '/', placement: 'final', label: 'Empezar solicitud gratuita' },
  { clickref: 'header_cta', page: '*', placement: 'header', label: 'Solicitar presupuestos' },
  { clickref: 'calculadora_result', page: '/calculadora/', placement: 'result', label: 'Obtén presupuestos adaptados a tu edificio' },
  { clickref: 'precios_table', page: '/precios/', placement: 'table', label: 'Pedir una valoración' },
  { clickref: 'servicios_hub', page: '/servicios/', placement: 'hub', label: 'Encontrar profesionales' },
  { clickref: 'provincias_hub', page: '/provincias/', placement: 'hub', label: 'Consultar empresas de mi zona' },
  { clickref: 'guias_hub', page: '/guias/', placement: 'hub', label: 'Solicitar presupuestos' },
  { clickref: 'contacto_cta', page: '/contacto/', placement: 'final', label: 'Solicitar presupuestos' },
  { clickref: 'rehabilitacion_edificios_hub', page: '/rehabilitacion-edificios/', placement: 'hub', label: 'Solicitar presupuestos' },
  { clickref: 'precios_calculator', page: '/precios/', placement: 'calculator', label: 'Obtén presupuestos adaptados a tu edificio' },
  { clickref: 'error_404_cta', page: '/404/', placement: 'final', label: 'Solicitar presupuestos' },
];

for (const service of services) {
  rows.push({
    clickref: `${service.slug}_hero`,
    page: service.path,
    placement: 'hero',
    service: service.slug,
    label: 'Solicitar presupuestos de esta actuación',
  });
  rows.push({
    clickref: `${service.slug}_final`,
    page: service.path,
    placement: 'final',
    service: service.slug,
    label: 'Comparar presupuestos',
  });
}

for (const location of locations) {
  rows.push({
    clickref: `${location.slug}_hero`,
    page: `/rehabilitacion-edificios/${location.slug}/`,
    placement: 'hero',
    location: location.slug,
    label: `Encontrar profesionales en ${location.name}`,
  });
  rows.push({
    clickref: `${location.slug}_midpage`,
    page: `/rehabilitacion-edificios/${location.slug}/`,
    placement: 'mid',
    location: location.slug,
    label: 'Pedir una valoración',
  });
}

const guideSlugs = [
  'cuanto-cuesta-rehabilitar-edificio',
  'precio-rehabilitar-fachada',
  'cuanto-cuesta-instalar-sate',
  'quien-paga-rehabilitacion-comunidad',
  'permisos-rehabilitar-fachada',
  'diferencia-ite-iee',
  'ayudas-rehabilitacion-edificios',
  'elegir-empresa-rehabilitacion',
  'reparar-grietas-fachada',
  'impermeabilizar-cubierta-comunidad',
];

for (const slug of guideSlugs) {
  rows.push({
    clickref: `guia_${slug}_cta`,
    page: `/guias/${slug}/`,
    placement: 'final',
    label: 'Solicitar presupuestos',
  });
}

export const trackingMap: ClickRefRecord[] = rows;

export function getClickRef(clickref: string): ClickRefRecord | undefined {
  return trackingMap.find((item) => item.clickref === clickref);
}
