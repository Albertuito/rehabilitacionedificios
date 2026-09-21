/**
 * Enlace de afiliación único. No hardcodear Habitissimo en componentes.
 * Awin: si faltan MID/AFFID se usa el destino con clickref.
 * En Vercel una variable definida pero vacía no debe anular el fallback.
 */
function publicEnv(value: unknown, fallback = ''): string {
  const text = typeof value === 'string' ? value.trim() : '';
  return text || fallback;
}

export const DEFAULT_AFFILIATE_DESTINATION = 'https://www.habitissimo.es/presupuestos/reformas';

export const affiliateConfig = {
  provider: 'awin' as const,
  programName: 'Habitissimo',
  merchantId: publicEnv(import.meta.env?.PUBLIC_AWIN_MID),
  affiliateId: publicEnv(import.meta.env?.PUBLIC_AWIN_AFFID),
  destinationUrl: publicEnv(import.meta.env?.PUBLIC_AFFILIATE_DESTINATION, DEFAULT_AFFILIATE_DESTINATION),
  awinBase: 'https://www.awin1.com/cread.php',
  rel: 'sponsored noopener' as const,
  disclosure:
    'Completarás la solicitud a través de Habitissimo para que profesionales interesados de tu zona puedan contactar contigo.',
} as const;

export type AffiliateConfig = typeof affiliateConfig;
