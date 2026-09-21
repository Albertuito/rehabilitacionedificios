export type ConsentChoice = 'accepted' | 'rejected' | 'custom';

export const CONSENT_COOKIE = 'ri_consent';

export function parseConsentCookie(value: string | undefined): ConsentChoice | null {
  if (value === 'accepted' || value === 'rejected' || value === 'custom') return value;
  return null;
}

export function analyticsAllowed(choice: ConsentChoice | null): boolean {
  return choice === 'accepted' || choice === 'custom';
}
