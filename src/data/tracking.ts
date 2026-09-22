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
  { clickref: 'home_hero_rehabilitacion', page: '/', placement: 'hero', label: 'Pedir presupuestos gratis' },
  { clickref: 'home_mid_proceso', page: '/', placement: 'proceso', label: 'Pedir presupuestos gratis' },
  { clickref: 'home_calculator_result', page: '/', placement: 'calculator', label: 'Pedir presupuestos gratis' },
  { clickref: 'home_final_cta', page: '/', placement: 'final', label: 'Pedir presupuestos gratis' },
  { clickref: 'header_cta', page: '*', placement: 'header', label: 'Pedir presupuestos gratis' },
  { clickref: 'mobile_sticky_cta', page: '*', placement: 'sticky', label: 'Pedir presupuestos gratis' },
  { clickref: 'como_funciona_cta', page: '/como-funciona/', placement: 'final', label: 'Pedir presupuestos gratis' },
  { clickref: 'calculadora_result', page: '/calculadora/', placement: 'result', label: 'Pedir presupuestos gratis' },
  { clickref: 'precios_table', page: '/precios/', placement: 'table', label: 'Pedir presupuestos gratis' },
  { clickref: 'servicios_hub', page: '/servicios/', placement: 'hub', label: 'Pedir presupuestos gratis' },
  { clickref: 'provincias_hub', page: '/provincias/', placement: 'hub', label: 'Pedir presupuestos gratis' },
  { clickref: 'guias_hub', page: '/guias/', placement: 'hub', label: 'Pedir presupuestos gratis' },
  { clickref: 'contacto_cta', page: '/contacto/', placement: 'final', label: 'Pedir presupuestos gratis' },
  { clickref: 'rehabilitacion_edificios_hub', page: '/rehabilitacion-edificios/', placement: 'hub', label: 'Pedir presupuestos gratis' },
  { clickref: 'precios_calculator', page: '/precios/', placement: 'calculator', label: 'Pedir presupuestos gratis' },
  { clickref: 'error_404_cta', page: '/404/', placement: 'final', label: 'Pedir presupuestos gratis' },
];

for (const service of services) {
  rows.push({
    clickref: `${service.slug}_hero`,
    page: service.path,
    placement: 'hero',
    service: service.slug,
    label: 'Pedir presupuestos gratis',
  });
  rows.push({
    clickref: `${service.slug}_final`,
    page: service.path,
    placement: 'final',
    service: service.slug,
    label: 'Pedir presupuestos gratis',
  });
}

for (const location of locations) {
  rows.push({
    clickref: `${location.slug}_hero`,
    page: `/rehabilitacion-edificios/${location.slug}/`,
    placement: 'hero',
    location: location.slug,
    label: `Pedir presupuestos gratis`,
  });
  rows.push({
    clickref: `${location.slug}_midpage`,
    page: `/rehabilitacion-edificios/${location.slug}/`,
    placement: 'mid',
    location: location.slug,
    label: 'Pedir presupuestos gratis',
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
    label: 'Pedir presupuestos gratis',
  });
}

export const trackingMap: ClickRefRecord[] = rows;

export function getClickRef(clickref: string): ClickRefRecord | undefined {
  return trackingMap.find((item) => item.clickref === clickref);
}
