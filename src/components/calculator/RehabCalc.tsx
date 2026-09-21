import { useMemo, useState } from 'preact/hooks';
import { locations } from '../../data/locations';
import { estimateRehab, formatEuro } from '../../lib/pricing';
import { buildAffiliateUrl } from '../../lib/affiliate';
import type { RehabAction } from '../../data/pricing';

interface Props {
  clickref: string;
  tone?: 'ivory' | 'charcoal';
}

const actions: { id: RehabAction; label: string }[] = [
  { id: 'integral', label: 'Rehabilitación integral' },
  { id: 'fachada', label: 'Fachada' },
  { id: 'cubierta', label: 'Cubierta o tejado' },
  { id: 'sate', label: 'Aislamiento SATE' },
  { id: 'grietas', label: 'Grietas y estructura' },
  { id: 'accesibilidad', label: 'Accesibilidad' },
  { id: 'bajantes', label: 'Bajantes' },
  { id: 'patios', label: 'Patios y zonas comunes' },
];

export default function RehabCalc({ clickref, tone = 'ivory' }: Props) {
  const [action, setAction] = useState<RehabAction>('fachada');
  const [floors, setFloors] = useState(5);
  const [area, setArea] = useState(400);
  const [condition, setCondition] = useState<'aceptable' | 'deteriorado' | 'grave'>('deteriorado');
  const [scaffolding, setScaffolding] = useState(true);
  const [province, setProvince] = useState('madrid');
  const [done, setDone] = useState(false);
  const dark = tone === 'charcoal';
  const result = useMemo(
    () => estimateRehab({ action, floors, area, condition, scaffolding, province }),
    [action, floors, area, condition, scaffolding, province],
  );
  const href = buildAffiliateUrl(clickref);

  return (
    <form
      class={dark ? 'text-paper' : 'text-ink'}
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
        window.dispatchEvent(
          new CustomEvent('ri:calculator_complete', {
            detail: { action, floors, area, province },
          }),
        );
      }}
    >
      <p class="ed-kicker" style={dark ? { color: '#c5cdc8' } : undefined}>
        Calculadora orientativa · sin datos personales
      </p>
      <h2 class="ed-h2" style={{ color: 'inherit', marginTop: 0 }}>
        Estima un intervalo para la actuación del edificio
      </h2>
      <div class="ed-grid">
        <label class="ed-field col-span-12 md:col-span-4">
          Tipo de actuación
          <select value={action} onChange={(event) => setAction(event.currentTarget.value as RehabAction)}>
            {actions.map((item) => (
              <option value={item.id}>{item.label}</option>
            ))}
          </select>
        </label>
        <label class="ed-field col-span-12 md:col-span-2">
          Plantas
          <input type="number" min={1} max={20} value={floors} onInput={(event) => setFloors(Number(event.currentTarget.value))} />
        </label>
        <label class="ed-field col-span-12 md:col-span-3">
          Superficie estimada (m²)
          <input type="number" min={20} max={8000} value={area} onInput={(event) => setArea(Number(event.currentTarget.value))} />
        </label>
        <label class="ed-field col-span-12 md:col-span-3">
          Estado actual
          <select value={condition} onChange={(event) => setCondition(event.currentTarget.value as typeof condition)}>
            <option value="aceptable">Aceptable</option>
            <option value="deteriorado">Deteriorado</option>
            <option value="grave">Grave</option>
          </select>
        </label>
        <label class="ed-field col-span-12 md:col-span-6">
          Provincia o ciudad
          <select value={province} onChange={(event) => setProvince(event.currentTarget.value)}>
            {locations.map((item) => (
              <option value={item.slug}>{item.name}</option>
            ))}
          </select>
        </label>
        <label class="ed-field col-span-12 md:col-span-6">
          Andamios o medios auxiliares
          <select value={scaffolding ? 'si' : 'no'} onChange={(event) => setScaffolding(event.currentTarget.value === 'si')}>
            <option value="si">Sí, previsibles</option>
            <option value="no">No está claro</option>
          </select>
        </label>
      </div>
      <p class={dark ? 'mt-6 text-paper/70' : 'mt-6 text-muted'}>{result.disclaimer}</p>
      <button class="ed-btn ed-btn-primary mt-4" type="submit">
        Calcular intervalo
      </button>
      {done && (
        <div class="mt-10 border-t pt-8" style={{ borderColor: dark ? 'rgba(255,255,255,.18)' : 'var(--color-border)' }}>
          <p class="font-serif tabular-nums leading-none" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}>
            {formatEuro(result.low)} – {formatEuro(result.high)}
          </p>
          <p class="mt-4">Referencia {result.consultedAt}. No es un presupuesto cerrado.</p>
          <ul class="mt-4 max-w-prose pl-5">
            {result.assumptions.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <a
            class="ed-btn ed-btn-primary mt-8"
            href={href}
            rel="sponsored noopener"
            target="_blank"
            data-clickref={clickref}
            data-event="affiliate_click"
            data-placement="calculator"
            data-location={province}
            data-service={action}
          >
            Obtén presupuestos adaptados a tu edificio
          </a>
        </div>
      )}
    </form>
  );
}
