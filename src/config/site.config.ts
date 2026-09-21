import { affiliateConfig } from './affiliate.config';

function envValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function processEnv(key: string): string {
  return typeof process !== 'undefined' ? envValue(process.env[key]) : '';
}

/** Always returns an origin with protocol so `new URL()` never throws on Vercel. */
export function resolveSiteUrl(
  configured = envValue(import.meta.env?.PUBLIC_SITE_URL) || processEnv('PUBLIC_SITE_URL'),
  vercelHost = processEnv('VERCEL_URL'),
): string {
  const fallback = vercelHost ? `https://${vercelHost.replace(/^https?:\/\//i, '')}` : 'https://example.com';
  const raw = configured || fallback;
  const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  try {
    return new URL(href).origin;
  } catch {
    return 'https://example.com';
  }
}

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
  siteUrl: resolveSiteUrl(),
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

export function absoluteUrl(path = '/', origin = siteConfig.siteUrl): string {
  const base = resolveSiteUrl(origin);
  const normalized = path.startsWith('/') ? path : `/${path}`;
  try {
    const url = new URL(normalized, `${base}/`);
    if (normalized === '/') return `${url.origin}/`;
    if (/\.[a-z0-9]+$/i.test(normalized)) return url.href;
    return url.href.endsWith('/') ? url.href : `${url.href}/`;
  } catch {
    return `${base}${normalized === '/' ? '/' : normalized}`;
  }
}
