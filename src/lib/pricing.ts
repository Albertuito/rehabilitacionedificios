import { locations } from '../data/locations';
import { actionBands, pricingMeta, type RehabAction } from '../data/pricing';

export interface RehabInput {
  action: RehabAction;
  floors: number;
  area: number;
  condition: 'aceptable' | 'deteriorado' | 'grave';
  scaffolding: boolean;
  province: string;
}

export interface RehabResult {
  low: number;
  high: number;
  unitLow: number;
  unitHigh: number;
  unit: string;
  consultedAt: string;
  disclaimer: string;
  assumptions: string[];
  exclusions: string[];
}

function roundTo(value: number): number {
  return Math.round(value / 100) * 100;
}

export function locationLabel(slug: string): string {
  if (!slug) return 'sin provincia';
  return locations.find((item) => item.slug === slug)?.name ?? slug;
}

export function estimateRehab(input: RehabInput): RehabResult {
  const band = actionBands[input.action];
  const floors = Math.min(20, Math.max(1, input.floors));
  const area = Math.min(8000, Math.max(20, input.area));
  const conditionFactor = input.condition === 'aceptable' ? 1 : input.condition === 'deteriorado' ? 1.18 : 1.35;
  const scaffoldFactor = input.scaffolding ? 1.12 : 1;
  const floorFactor = 1 + Math.max(0, floors - 4) * 0.03;
  const lump = input.action === 'accesibilidad';
  const unitLow = roundTo(band.low * conditionFactor * scaffoldFactor * (lump ? 1 : floorFactor));
  const unitHigh = roundTo(band.high * conditionFactor * scaffoldFactor * (lump ? 1 : floorFactor));
  const low = lump ? unitLow : roundTo(area * band.low * conditionFactor * scaffoldFactor * floorFactor);
  const high = lump ? unitHigh : roundTo(area * band.high * conditionFactor * scaffoldFactor * floorFactor);
  return {
    low,
    high,
    unitLow: band.low,
    unitHigh: band.high,
    unit: band.unit,
    consultedAt: pricingMeta.consultedAt,
    disclaimer: pricingMeta.disclaimer,
    assumptions: [
      `${band.label} · ${band.unit}: ${band.low}–${band.high}`,
      `${floors} plantas aproximadas`,
      lump ? 'Actuación tipo portal / accesos, no una tarifa por m²' : `${area} m² de superficie de actuación estimada`,
      `Estado ${input.condition}`,
      input.scaffolding ? 'Incluye un recargo orientativo por andamios o medios auxiliares' : 'Sin recargo extra de andamio en el modelo',
      `Contexto ${locationLabel(input.province)}`,
    ],
    exclusions: [
      'Proyecto facultativo, dirección de obra y honorarios técnicos',
      'Tasas municipales y ocupación de vía pública',
      'IVA y ayudas o subvenciones',
      'Partidas no descritas (estructura oculta, amianto, instalaciones interiores)',
      'Medición real de fachada o cubierta',
    ],
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}
