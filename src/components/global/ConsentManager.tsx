import { useEffect, useState } from 'preact/hooks';

type Choice = 'accepted' | 'rejected' | 'custom' | null;

interface Props {
  brand: string;
}

const COOKIE = 'ri_consent';

function readChoice(): Choice {
  const match = document.cookie.split('; ').find((item) => item.startsWith(`${COOKIE}=`));
  const value = match?.split('=')[1];
  if (value === 'accepted' || value === 'rejected' || value === 'custom') return value;
  return null;
}

function writeChoice(choice: Exclude<Choice, null>) {
  const expires = new Date();
  expires.setFullYear(expires.getFullYear() + 1);
  document.cookie = `${COOKIE}=${choice}; expires=${expires.toUTCString()}; path=/; SameSite=Lax`;
  window.dispatchEvent(new CustomEvent('ri:consent', { detail: choice }));
}

export default function ConsentManager({ brand }: Props) {
  const [choice, setChoice] = useState<Choice>(null);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const current = readChoice();
    setChoice(current);
    setOpen(!current);
    const reopen = () => setOpen(true);
    document.addEventListener('ri:open-consent', reopen);
    return () => document.removeEventListener('ri:open-consent', reopen);
  }, []);

  if (!open) return null;

  const decide = (next: Exclude<Choice, null>) => {
    writeChoice(next);
    setChoice(next);
    setOpen(false);
  };

  return (
    <div class="consent-banner" role="dialog" aria-labelledby="consent-title" aria-describedby="consent-text">
      <h2 id="consent-title">Cookies en {brand}</h2>
      <p id="consent-text">
        Solo las técnicas son necesarias. La analítica no esencial se carga si la aceptas. Rechazar no bloquea la
        calculadora ni pedir presupuesto.
      </p>
      <div class="consent-actions">
        <button class="btn btn-primary" type="button" onClick={() => decide('accepted')}>
          Aceptar
        </button>
        <button class="btn btn-secondary" type="button" onClick={() => decide('rejected')}>
          Rechazar
        </button>
        <button class="btn btn-ghost" type="button" onClick={() => decide('custom')}>
          Configurar
        </button>
      </div>
    </div>
  );
}
