import { useEffect, useState } from 'preact/hooks';

type Choice = 'accepted' | 'rejected' | 'custom' | null;
interface Props { brand: string }
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

  const decide = (next: Exclude<Choice, null>) => {
    writeChoice(next);
    setOpen(false);
  };

  return (
    <div class="fixed bottom-4 right-4 z-50 w-[min(28rem,calc(100%-2rem))] border border-border bg-paper p-5 text-ink shadow-[0_8px_30px_rgb(21_25_24/12%)]" role="dialog" aria-labelledby="consent-title">
      <h2 id="consent-title" class="font-serif text-2xl m-0">Cookies en {brand}</h2>
      <p class="mt-3 text-sm text-ink-soft">
        Solo las técnicas son necesarias. La analítica no esencial se carga si la aceptas. Rechazar no bloquea la calculadora ni pedir presupuesto.
      </p>
      <div class="mt-4 grid grid-cols-1 gap-2 sm:grid-cols-3">
        <button class="ed-btn ed-btn-primary" type="button" onClick={() => decide('accepted')}>Aceptar</button>
        <button class="ed-btn ed-btn-ghost" type="button" onClick={() => decide('rejected')}>Rechazar</button>
        <button class="ed-btn ed-btn-ghost" type="button" onClick={() => decide('custom')}>Configurar</button>
      </div>
    </div>
  );
}
