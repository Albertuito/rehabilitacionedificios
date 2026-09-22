import { affiliateConfig } from './affiliate.config';

function envValue(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function processEnv(key: string): string {
  return typeof process !== 'undefined' ? envValue(process.env[key]) : '';
}

function withOrigin(raw: string): string {
  const href = /^https?:\/\//i.test(raw) ? raw : `https://${raw}`;
  return new URL(href).origin;
}

/** Always returns an origin with protocol so `new URL()` never throws on Vercel. */
export function resolveSiteUrl(
  configured = envValue(import.meta.env?.PUBLIC_SITE_URL) || processEnv('PUBLIC_SITE_URL'),
  vercelHost = processEnv('VERCEL_URL'),
  productionHost = processEnv('VERCEL_PROJECT_PRODUCTION_URL'),
): string {
  const candidates = [configured, productionHost, vercelHost].filter(Boolean);
  for (const raw of candidates) {
    try {
      return withOrigin(raw);
    } catch {
      continue;
    }
  }
  return 'https://example.com';
}

export function isPreviewDeployment(): boolean {
  return processEnv('VERCEL_ENV') === 'preview';
}

export function isIndexableHost(url: string): boolean {
  try {
    const host = new URL(url).hostname;
    if (host === 'localhost' || host === '127.0.0.1' || host === 'example.com') return false;
    if (host.endsWith('.vercel.app')) return false;
    return true;
  } catch {
    return false;
  }
}

export function isFilledLegalValue(value: string): boolean {
  const text = value.trim();
  if (!text) return false;
  if (text.startsWith('[') && text.endsWith(']')) return false;
  if (/pendiente/i.test(text)) return false;
  return true;
}

export const siteConfig = {
  brand: {
    name: 'Rehabilita tu Edificio',
    shortName: 'Rehabilita tu Edificio',
    tagline: 'Te ayudamos a encontrar empresas especializadas para rehabilitar tu edificio.',
    promise:
      'Medio editorial que ayuda a comunidades y propietarios a comparar empresas de rehabilitación de edificios. No ejecutamos obras.',
    differentiation:
      'No ejecutamos obras ni tenemos cuadrillas. Ordenamos el alcance, explicamos partidas y conectamos con profesionales de la zona.',
  },
  locale: 'es-ES',
  country: 'ES',
  language: 'es',
  siteUrl: resolveSiteUrl(),
  trailingSlash: true as const,
  contact: {
    email: envValue(import.meta.env?.PUBLIC_CONTACT_EMAIL) || envValue(processEnv('PUBLIC_CONTACT_EMAIL')),
    postalAddress: envValue(import.meta.env?.PUBLIC_POSTAL_ADDRESS) || envValue(processEnv('PUBLIC_POSTAL_ADDRESS')),
  },
  legal: {
    legalName: envValue(import.meta.env?.PUBLIC_LEGAL_NAME) || envValue(processEnv('PUBLIC_LEGAL_NAME')) || '[RAZÓN SOCIAL]',
    taxId: envValue(import.meta.env?.PUBLIC_TAX_ID) || envValue(processEnv('PUBLIC_TAX_ID')) || '[NIF/CIF]',
    hosting: envValue(import.meta.env?.PUBLIC_HOSTING) || envValue(processEnv('PUBLIC_HOSTING')) || '[ALOJAMIENTO]',
    registry: envValue(import.meta.env?.PUBLIC_REGISTRY) || envValue(processEnv('PUBLIC_REGISTRY')),
  },
  affiliate: affiliateConfig,
  analytics: {
    gtmId: envValue(import.meta.env?.PUBLIC_GTM_ID),
    gaMeasurementId: envValue(import.meta.env?.PUBLIC_GA_ID),
    clarityId: envValue(import.meta.env?.PUBLIC_CLARITY_ID),
    searchConsole: envValue(import.meta.env?.PUBLIC_GSC_VERIFICATION),
  },
  social: {
    twitter: envValue(import.meta.env?.PUBLIC_TWITTER),
  },
  defaults: {
    authorId: 'equipo-editorial',
    reviewerId: 'revision-tecnica',
    ogImage: '/images/og/default.jpg',
    ogWidth: 1200,
    ogHeight: 630,
  },
} as const;

export type SiteConfig = typeof siteConfig;

export function isLegalComplete(
  legal = siteConfig.legal,
  contact = siteConfig.contact,
): boolean {
  return (
    isFilledLegalValue(legal.legalName) &&
    isFilledLegalValue(legal.taxId) &&
    isFilledLegalValue(legal.hosting) &&
    isFilledLegalValue(contact.email) &&
    isFilledLegalValue(contact.postalAddress)
  );
}

export function shouldIndex(): boolean {
  if (isPreviewDeployment()) return false;
  const publicUrl = envValue(import.meta.env?.PUBLIC_SITE_URL) || processEnv('PUBLIC_SITE_URL');
  if (!publicUrl) return false;
  return isLegalComplete() && isIndexableHost(resolveSiteUrl(publicUrl));
}

export function robotsContent(pageOverride?: string): string {
  if (!shouldIndex()) return 'noindex,nofollow';
  return pageOverride ?? 'index,follow';
}

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
