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
  consultedAt: string;
  disclaimer: string;
  assumptions: string[];
}

function roundTo(value: number): number {
  return Math.round(value / 100) * 100;
}

export function estimateRehab(input: RehabInput): RehabResult {
  const band = actionBands[input.action];
  const floors = Math.min(20, Math.max(1, input.floors));
  const area = Math.min(8000, Math.max(20, input.area));
  const conditionFactor = input.condition === 'aceptable' ? 1 : input.condition === 'deteriorado' ? 1.18 : 1.35;
  const scaffoldFactor = input.scaffolding ? 1.12 : 1;
  const floorFactor = 1 + Math.max(0, floors - 4) * 0.03;
  const lump = input.action === 'accesibilidad';
  const low = lump
    ? roundTo(band.low * conditionFactor * scaffoldFactor)
    : roundTo(area * band.low * conditionFactor * scaffoldFactor * floorFactor);
  const high = lump
    ? roundTo(band.high * conditionFactor * scaffoldFactor)
    : roundTo(area * band.high * conditionFactor * scaffoldFactor * floorFactor);
  return {
    low,
    high,
    consultedAt: pricingMeta.consultedAt,
    disclaimer: pricingMeta.disclaimer,
    assumptions: [
      `${band.label} · ${band.unit}`,
      `${floors} plantas aproximadas`,
      lump ? 'Actuación tipo portal / accesos, no una tarifa por m²' : `${area} m² de superficie de actuación estimada`,
      `Estado ${input.condition}`,
      input.scaffolding ? 'Incluye un recargo orientativo por andamios o medios auxiliares' : 'Sin recargo extra de andamio en el modelo',
      `Contexto ${input.province}`,
      pricingMeta.disclaimer,
    ],
  };
}

export function formatEuro(value: number): string {
  return new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(value);
}
