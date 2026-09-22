/**
 * Solo hosts oficiales de Awin. Prioriza el enlace largo
 * https://www.awin1.com/cread.php?... para poder variar clickref
 * por página, servicio, ubicación y posición. tidd.ly se admite,
 * pero no permite el mismo control de parámetros.
 */
function publicEnv(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

const OFFICIAL_AWIN_HOSTS = new Set(['www.awin1.com', 'awin1.com', 'tidd.ly']);

export function isAwinTrackingUrl(url: string): boolean {
  try {
    const parsed = new URL(url);
    return OFFICIAL_AWIN_HOSTS.has(parsed.hostname.toLowerCase());
  } catch {
    return false;
  }
}

const trackingUrlRaw = publicEnv(import.meta.env?.PUBLIC_AWIN_URL);
const trackingUrl = trackingUrlRaw && isAwinTrackingUrl(trackingUrlRaw) ? trackingUrlRaw : '';

export const affiliateConfig = {
  provider: 'awin' as const,
  programName: 'Habitissimo / Awin',
  trackingUrl,
  isConfigured: Boolean(trackingUrl),
  rel: 'sponsored' as const,
  disabledReason:
    'Falta PUBLIC_AWIN_URL (enlace real de Awin o tidd.ly). Los botones de presupuesto están desactivados hasta configurarlo.',
  disclosure:
    'Solicitud patrocinada: el formulario lo gestiona Habitissimo. Podemos recibir comisión. No ejecutamos la obra.',
} as const;

export type AffiliateConfig = typeof affiliateConfig;
