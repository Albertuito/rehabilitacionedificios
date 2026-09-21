/**
 * Enlace de afiliación único. No hardcodear Habitissimo en componentes.
 * Awin: si faltan MID/AFFID se usa el destino con clickref.
 */
export const affiliateConfig = {
  provider: 'awin' as const,
  programName: 'Habitissimo',
  merchantId: import.meta.env?.PUBLIC_AWIN_MID ?? '',
  affiliateId: import.meta.env?.PUBLIC_AWIN_AFFID ?? '',
  destinationUrl:
    import.meta.env?.PUBLIC_AFFILIATE_DESTINATION ?? 'https://www.habitissimo.es/presupuestos/reformas',
  awinBase: 'https://www.awin1.com/cread.php',
  rel: 'sponsored noopener' as const,
  disclosure:
    'Completarás la solicitud a través de Habitissimo para que profesionales interesados de tu zona puedan contactar contigo.',
} as const;

export type AffiliateConfig = typeof affiliateConfig;
