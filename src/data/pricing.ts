export type RehabAction =
  | 'integral'
  | 'fachada'
  | 'cubierta'
  | 'sate'
  | 'grietas'
  | 'accesibilidad'
  | 'bajantes'
  | 'patios';

export const actionBands: Record<RehabAction, { label: string; low: number; high: number; unit: string }> = {
  integral: { label: 'Rehabilitación integral', low: 180, high: 420, unit: '€/m² envolvente orientativa' },
  fachada: { label: 'Fachada', low: 90, high: 260, unit: '€/m² de fachada' },
  cubierta: { label: 'Cubierta o tejado', low: 70, high: 220, unit: '€/m² de cubierta' },
  sate: { label: 'Aislamiento SATE', low: 80, high: 180, unit: '€/m² de fachada' },
  grietas: { label: 'Grietas y estructura', low: 40, high: 160, unit: '€/m² afectado' },
  accesibilidad: { label: 'Accesibilidad', low: 12000, high: 48000, unit: '€ por actuación tipo portal/ascensor' },
  bajantes: { label: 'Bajantes', low: 180, high: 420, unit: '€/ml orientativo' },
  patios: { label: 'Patios y zonas comunes', low: 60, high: 180, unit: '€/m² de patio' },
};

export const pricingMeta = {
  consultedAt: '2026-09-21',
  reviewAfter: '2026-12-21',
  disclaimer:
    'Los importes son orientativos. Cada edificio necesita una valoración técnica y un presupuesto personalizado.',
};
