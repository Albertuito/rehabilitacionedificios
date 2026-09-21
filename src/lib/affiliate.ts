import { affiliateConfig } from '../config/affiliate.config';
import { getClickRef } from '../data/tracking';

export function buildAffiliateUrl(clickref: string): string {
  const { merchantId, affiliateId, destinationUrl, awinBase } = affiliateConfig;
  if (!merchantId || !affiliateId) {
    const fallback = new URL(destinationUrl);
    fallback.searchParams.set('clickref', clickref);
    return fallback.toString();
  }
  const params = new URLSearchParams();
  params.set('awinmid', merchantId);
  params.set('awinaffid', affiliateId);
  params.set('clickref', clickref);
  params.set('ued', destinationUrl);
  return `${awinBase}?${params.toString()}`;
}

export function assertClickref(clickref: string): void {
  if (!getClickRef(clickref)) {
    throw new Error(`Unknown clickref ${clickref}. Add it to src/data/tracking.ts`);
  }
}
