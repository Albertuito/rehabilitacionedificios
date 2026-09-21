import { affiliateConfig } from './affiliate.config';

export const siteConfig = {
  brand: {
    name: 'Rehabilita tu Edificio',
    shortName: 'Rehabilita tu Edificio',
    tagline: 'Te ayudamos a encontrar empresas especializadas para rehabilitar tu edificio.',
    promise:
      'Plataforma nacional informativa que ayuda a propietarios, presidentes de comunidad y administradores a encontrar y comparar empresas especializadas en rehabilitación de edificios, a través de Habitissimo.',
    differentiation:
      'No ejecutamos obras ni tenemos cuadrillas. Ordenamos el alcance, explicamos partidas y conectamos con profesionales de la zona.',
  },
  locale: 'es-ES',
  country: 'ES',
  language: 'es',
  siteUrl: import.meta.env?.PUBLIC_SITE_URL ?? 'https://example.com',
  trailingSlash: true as const,
  contact: {
    email: import.meta.env?.PUBLIC_CONTACT_EMAIL ?? '',
    postalAddress: import.meta.env?.PUBLIC_POSTAL_ADDRESS ?? '',
  },
  legal: {
    legalName: import.meta.env?.PUBLIC_LEGAL_NAME ?? '[RAZÓN SOCIAL]',
    taxId: import.meta.env?.PUBLIC_TAX_ID ?? '[NIF/CIF]',
    hosting: import.meta.env?.PUBLIC_HOSTING ?? '[ALOJAMIENTO]',
    registry: import.meta.env?.PUBLIC_REGISTRY ?? '',
  },
  affiliate: affiliateConfig,
  analytics: {
    gtmId: import.meta.env?.PUBLIC_GTM_ID ?? '',
    gaMeasurementId: import.meta.env?.PUBLIC_GA_ID ?? '',
    clarityId: import.meta.env?.PUBLIC_CLARITY_ID ?? '',
    searchConsole: import.meta.env?.PUBLIC_GSC_VERIFICATION ?? '',
  },
  social: {
    twitter: import.meta.env?.PUBLIC_TWITTER ?? '',
  },
  defaults: {
    authorId: 'equipo-editorial',
    reviewerId: 'revision-tecnica',
    ogImage: '/images/og/default.svg',
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function absoluteUrl(path = '/'): string {
  const origin = siteConfig.siteUrl.replace(/\/$/, '');
  const normalized = path.startsWith('/') ? path : `/${path}`;
  if (normalized === '/') return `${origin}/`;
  if (/\.[a-z0-9]+$/i.test(normalized)) return `${origin}${normalized}`;
  return `${origin}${normalized.endsWith('/') ? normalized : `${normalized}/`}`;
}
