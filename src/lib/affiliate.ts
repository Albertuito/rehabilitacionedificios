import { affiliateConfig, DEFAULT_AFFILIATE_DESTINATION } from '../config/affiliate.config';
import { getClickRef } from '../data/tracking';

export function resolveAffiliateDestination(raw: string): string {
  const trimmed = (raw ?? '').trim();
  const href = trimmed
    ? /^https?:\/\//i.test(trimmed)
      ? trimmed
      : `https://${trimmed}`
    : DEFAULT_AFFILIATE_DESTINATION;
  try {
    return new URL(href).toString();
  } catch {
    return DEFAULT_AFFILIATE_DESTINATION;
  }
}

export function buildAffiliateUrl(clickref: string): string {
  const merchantId = affiliateConfig.merchantId.trim();
  const affiliateId = affiliateConfig.affiliateId.trim();
  const destination = resolveAffiliateDestination(affiliateConfig.destinationUrl);
  if (!merchantId || !affiliateId) {
    const fallback = new URL(destination);
    fallback.searchParams.set('clickref', clickref);
    return fallback.toString();
  }
  const params = new URLSearchParams();
  params.set('awinmid', merchantId);
  params.set('awinaffid', affiliateId);
  params.set('clickref', clickref);
  params.set('ued', destination);
  return `${affiliateConfig.awinBase}?${params.toString()}`;
}

export function assertClickref(clickref: string): void {
  if (!getClickRef(clickref)) {
    throw new Error(`Unknown clickref ${clickref}. Add it to src/data/tracking.ts`);
  }
}
