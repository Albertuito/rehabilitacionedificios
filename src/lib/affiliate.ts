import { affiliateConfig, isAwinTrackingUrl } from '../config/affiliate.config';
import { getClickRef } from '../data/tracking';
import { awinConsentValue, type ConsentChoice } from './consent';

export interface AffiliateContext {
  service?: string;
  location?: string;
  placement?: string;
  consent?: ConsentChoice;
}

export function hasAffiliateTracking(url = affiliateConfig.trackingUrl): boolean {
  return Boolean(url) && isAwinTrackingUrl(url);
}

/** Destino directo (Habitissimo) no cuenta como tracking. Solo Awin/tidd.ly. */
export function resolveAffiliateDestination(raw: string): string | null {
  const trimmed = (raw ?? '').trim();
  if (!trimmed) return null;
  try {
    const url = new URL(/^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`);
    return isAwinTrackingUrl(url.toString()) ? url.toString() : null;
  } catch {
    return null;
  }
}

export function applyAwinConsent(href: string, consent: ConsentChoice): string {
  const url = new URL(href);
  const cons = awinConsentValue(consent);
  if (cons) url.searchParams.set('cons', cons);
  else url.searchParams.delete('cons');
  return url.toString();
}

export function buildAffiliateUrl(
  clickref: string,
  extra: AffiliateContext = {},
  trackingUrl = affiliateConfig.trackingUrl,
): string | null {
  if (!hasAffiliateTracking(trackingUrl)) return null;
  const url = new URL(trackingUrl);
  url.searchParams.set('clickref', clickref);
  if (extra.placement) url.searchParams.set('clickref2', extra.placement);
  const context = [extra.service, extra.location].filter(Boolean).join('|');
  if (context) url.searchParams.set('clickref3', context);
  const cons = awinConsentValue(extra.consent ?? null);
  if (cons) url.searchParams.set('cons', cons);
  else url.searchParams.delete('cons');
  return url.toString();
}

export function assertClickref(clickref: string): void {
  if (!getClickRef(clickref)) {
    throw new Error(`Unknown clickref ${clickref}. Add it to src/data/tracking.ts`);
  }
}
