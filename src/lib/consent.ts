export const CONSENT_COOKIE = 'ri_consent';

export type ConsentChoice = 'accepted' | 'rejected' | 'custom' | null;

export function parseConsentChoice(value: string | undefined | null): ConsentChoice {
  if (value === 'accepted' || value === 'rejected' || value === 'custom') return value;
  return null;
}

export function readConsentFromCookieHeader(cookieHeader = ''): ConsentChoice {
  const match = cookieHeader.split('; ').find((item) => item.startsWith(`${CONSENT_COOKIE}=`));
  return parseConsentChoice(match?.split('=')[1]);
}

export function readConsentFromDocument(): ConsentChoice {
  if (typeof document === 'undefined') return null;
  return readConsentFromCookieHeader(document.cookie);
}

/** Awin `cons`: 1 si aceptó tracking, 0 si rechazó. Sin elección, no se asume. */
export function awinConsentValue(choice: ConsentChoice): '1' | '0' | undefined {
  if (choice === 'accepted') return '1';
  if (choice === 'rejected') return '0';
  return undefined;
}
