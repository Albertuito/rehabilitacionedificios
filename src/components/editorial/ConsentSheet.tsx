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
      class="consent-sheet"
      role="dialog"
      aria-labelledby="consent-title"
    >
      <h2 id="consent-title" class="consent-sheet__title">
        Cookies en {brand}
      </h2>
      <p class="consent-sheet__copy">
        Solo las técnicas son necesarias. La analítica se carga si la aceptas.
      </p>
      <div class="consent-sheet__actions">
        <button class="ed-btn ed-btn-primary" type="button" onClick={() => decide('accepted')}>
          Aceptar
        </button>
        <button class="ed-btn ed-btn-ghost" type="button" onClick={() => decide('rejected')}>
          Rechazar
        </button>
        <button class="ed-btn ed-btn-ghost" type="button" onClick={() => decide('custom')}>
          Ajustar
        </button>
      </div>
    </div>
  );
}
