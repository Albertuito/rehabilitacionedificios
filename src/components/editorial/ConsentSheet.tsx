import { useEffect, useState } from 'preact/hooks';
import { CONSENT_COOKIE, parseConsentChoice, type ConsentChoice } from '../../lib/consent';

interface Props { brand: string }

function readChoice(): ConsentChoice {
  const match = document.cookie.split('; ').find((item) => item.startsWith(`${CONSENT_COOKIE}=`));
  return parseConsentChoice(match?.split('=')[1]);
}

function writeChoice(choice: Exclude<ConsentChoice, null>) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${CONSENT_COOKIE}=${choice}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('ri:consent', { detail: choice }));
}

export default function ConsentSheet({ brand }: Props) {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const current = readChoice();
    setOpen(!current);
    const reopen = () => setOpen(true);
    document.addEventListener('ri:open-consent', reopen);
    return () => document.removeEventListener('ri:open-consent', reopen);
  }, []);

  if (!open) return null;

  const decide = (next: Exclude<ConsentChoice, null>) => {
    writeChoice(next);
    setOpen(false);
  };

  return (
    <div
      class="fixed bottom-3 right-3 z-50 w-[min(20.5rem,calc(100%-1.5rem))] border border-border bg-paper p-3.5 text-ink shadow-[0_6px_20px_rgb(21_25_24/10%)]"
      role="dialog"
      aria-labelledby="consent-title"
    >
      <h2 id="consent-title" class="font-serif text-lg m-0 leading-tight">
        Cookies en {brand}
      </h2>
      <p class="mt-2 text-xs text-ink-soft leading-snug">
        Solo las técnicas son necesarias. La analítica se carga si la aceptas.
      </p>
      <div class="mt-3 grid grid-cols-3 gap-1.5">
        <button class="ed-btn ed-btn-primary" type="button" style={{ minHeight: '2.25rem', fontSize: '0.75rem', padding: '0 0.4rem' }} onClick={() => decide('accepted')}>
          Aceptar
        </button>
        <button class="ed-btn ed-btn-ghost" type="button" style={{ minHeight: '2.25rem', fontSize: '0.75rem', padding: '0 0.4rem' }} onClick={() => decide('rejected')}>
          Rechazar
        </button>
        <button class="ed-btn ed-btn-ghost" type="button" style={{ minHeight: '2.25rem', fontSize: '0.75rem', padding: '0 0.4rem' }} onClick={() => decide('custom')}>
          Ajustar
        </button>
      </div>
    </div>
  );
}
