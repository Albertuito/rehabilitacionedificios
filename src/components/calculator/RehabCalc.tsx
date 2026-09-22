import { useEffect, useMemo, useState } from 'preact/hooks';
import { locations } from '../../data/locations';
import { estimateRehab, formatEuro } from '../../lib/pricing';
import { buildAffiliateUrl } from '../../lib/affiliate';
import { affiliateConfig, PRIMARY_CTA } from '../../config/affiliate.config';
import { readConsentFromDocument, type ConsentChoice } from '../../lib/consent';
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

function emit(name: string, detail: Record<string, unknown>) {
  window.dispatchEvent(new CustomEvent(name, { detail }));
}

export default function RehabCalc({ clickref, tone = 'ivory' }: Props) {
  const [action, setAction] = useState<RehabAction>('fachada');
  const [floors, setFloors] = useState(5);
  const [area, setArea] = useState(400);
  const [condition, setCondition] = useState<'aceptable' | 'deteriorado' | 'grave'>('deteriorado');
  const [scaffolding, setScaffolding] = useState(true);
  const [province, setProvince] = useState('');
  const [consent, setConsent] = useState<ConsentChoice>(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    setConsent(readConsentFromDocument());
    const onConsent = (event: Event) => {
      const detail = (event as CustomEvent<ConsentChoice>).detail;
      setConsent(detail ?? readConsentFromDocument());
    };
    window.addEventListener('ri:consent', onConsent);
    return () => window.removeEventListener('ri:consent', onConsent);
  }, []);
  const dark = tone === 'charcoal';
  const result = useMemo(
    () => estimateRehab({ action, floors, area, condition, scaffolding, province }),
    [action, floors, area, condition, scaffolding, province],
  );
  const href = buildAffiliateUrl(clickref, {
    service: action,
    location: province || undefined,
    placement: 'calculator',
    consent,
  });

  return (
    <form
      class={dark ? 'rehab-calc is-dark text-paper' : 'rehab-calc text-ink'}
      onSubmit={(event) => {
        event.preventDefault();
        setDone(true);
        const detail = { action, floors, area, province };
        emit('ri:calculator_submit', detail);
        emit('ri:calculator_complete', detail);
      }}
    >
      <p class="ed-kicker" style={dark ? { color: 'var(--color-orange-500)' } : undefined}>
        Calculadora orientativa · sin datos personales
      </p>
      <h2 class="ed-h2" style={{ color: 'inherit', marginTop: 0 }}>
        Estima un intervalo para la actuación del edificio
      </h2>
      <div class="ed-grid">
        <label class="ed-field col-span-12 md:col-span-4">
          Tipo de actuación
          <select
            value={action}
            onChange={(event) => {
              const next = event.currentTarget.value as RehabAction;
              setAction(next);
              emit('ri:service_select', { service: next });
            }}
          >
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
          <select
            value={province}
            onChange={(event) => {
              const next = event.currentTarget.value;
              setProvince(next);
              if (next) emit('ri:location_select', { location: next });
            }}
          >
            <option value="">Elige provincia</option>
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
      <p class={dark ? 'mt-2 text-paper/70' : 'mt-2 text-muted'}>
        Bandas de partida: {result.unitLow}–{result.unitHigh} {result.unit}.
      </p>
      <button class="ed-btn ed-btn-primary mt-4" type="submit">
        Calcular intervalo
      </button>
      {done && (
        <div class="mt-10 border-t pt-8" style={{ borderColor: dark ? 'rgba(255,255,255,.18)' : 'var(--color-border)' }}>
          <p class="rehab-calc__result">
            {formatEuro(result.low)} – {formatEuro(result.high)}
          </p>
          <p class="mt-4">Referencia {result.consultedAt}. No es un presupuesto cerrado.</p>
          <ul class="mt-4 max-w-prose pl-5">
            {result.assumptions.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          <p class="mt-6 font-semibold">No incluye</p>
          <ul class="mt-2 max-w-prose pl-5">
            {result.exclusions.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
          {href ? (
            <a
              class="ed-btn ed-btn-primary mt-8"
              href={href}
              rel={affiliateConfig.rel}
              data-clickref={clickref}
              data-event="affiliate_click"
              data-placement="calculator"
              data-location={province}
              data-service={action}
            >
              {PRIMARY_CTA}
            </a>
          ) : (
            <span class="ed-btn ed-btn-primary is-disabled mt-8" aria-disabled="true" title={affiliateConfig.disabledReason}>
              {PRIMARY_CTA}
            </span>
          )}
        </div>
      )}
    </form>
  );
}
