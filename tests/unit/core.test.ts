import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { estimateRehab, formatEuro, locationLabel } from '../../src/lib/pricing';
import { trackingMap } from '../../src/data/tracking';
import { locations } from '../../src/data/locations';
import { affiliateConfig, isAwinTrackingUrl } from '../../src/config/affiliate.config';
import { applyAwinConsent, buildAffiliateUrl, resolveAffiliateDestination } from '../../src/lib/affiliate';
import { awinConsentValue, readConsentFromCookieHeader } from '../../src/lib/consent';
import { geoSectionOrder } from '../../src/lib/location-layout';
import {
  absoluteUrl,
  isIndexableHost,
  isLegalComplete,
  resolveSiteUrl,
} from '../../src/config/site.config';

describe('pricing', () => {
  it('returns a rounded interval, never a closed quote', () => {
    const result = estimateRehab({
      action: 'fachada',
      floors: 5,
      area: 400,
      condition: 'deteriorado',
      scaffolding: true,
      province: 'madrid',
    });
    assert.ok(result.high > result.low);
    assert.match(result.disclaimer, /orientativos/i);
    assert.ok(formatEuro(result.low).includes('€'));
    assert.ok(result.exclusions.length >= 4);
    assert.match(result.assumptions.join(' '), /Madrid/);
    assert.equal(locationLabel('madrid'), 'Madrid');
  });
});

describe('tracking', () => {
  it('never reuses a clickref', () => {
    const refs = trackingMap.map((item) => item.clickref);
    assert.equal(new Set(refs).size, refs.length);
  });
});

describe('locations', () => {
  it('has 30 unique layout ids and module orders', () => {
    assert.equal(locations.length, 30);
    assert.equal(new Set(locations.map((item) => item.layoutId)).size, 30);
    const orders = locations.map((_, index) => geoSectionOrder(index).join(','));
    assert.equal(new Set(orders).size, 30);
  });
});

describe('site url', () => {
  it('accepts an empty or protocol-less host without throwing', () => {
    assert.equal(resolveSiteUrl('', ''), 'https://example.com');
    assert.equal(resolveSiteUrl('', 'rehabilitacionedificios.vercel.app'), 'https://rehabilitacionedificios.vercel.app');
    assert.equal(
      resolveSiteUrl('', 'preview-hash.vercel.app', 'rehabilitacionedificios.vercel.app'),
      'https://rehabilitacionedificios.vercel.app',
    );
    assert.equal(resolveSiteUrl('rehabilitacionedificios.vercel.app'), 'https://rehabilitacionedificios.vercel.app');
    assert.equal(absoluteUrl('/images/og/default.jpg', 'https://example.com'), 'https://example.com/images/og/default.jpg');
  });

  it('does not treat preview hosts or empty legal as indexable', () => {
    assert.equal(isIndexableHost('https://foo.vercel.app'), false);
    assert.equal(isIndexableHost('https://rehabilitandoedificios.es'), true);
    assert.equal(isLegalComplete(), false);
  });
});

describe('affiliate', () => {
  const awinBase =
    'https://www.awin1.com/cread.php?awinmid=123&awinaffid=456&ued=https%3A%2F%2Fwww.habitissimo.es%2Fpresupuestos%2Freformas';

  function params(href: string | null): URLSearchParams {
    assert.ok(href);
    return new URL(href).searchParams;
  }

  it('preserves original Awin query parameters', () => {
    const href = buildAffiliateUrl('home_hero_rehabilitacion', {}, awinBase);
    const search = params(href);
    assert.equal(search.get('awinmid'), '123');
    assert.equal(search.get('awinaffid'), '456');
    assert.equal(search.get('ued'), 'https://www.habitissimo.es/presupuestos/reformas');
    assert.equal(new URL(href as string).hostname, 'www.awin1.com');
  });

  it('sets the clickref of each CTA', () => {
    for (const clickref of ['home_hero_rehabilitacion', 'header_cta', 'madrid_hero', 'rehabilitacion-fachadas_hero']) {
      const href = buildAffiliateUrl(clickref, {}, awinBase);
      assert.equal(params(href).get('clickref'), clickref);
    }
  });

  it('sets clickref2 from placement', () => {
    const href = buildAffiliateUrl('home_hero_rehabilitacion', { placement: 'hero' }, awinBase);
    assert.equal(params(href).get('clickref2'), 'hero');
  });

  it('sets clickref3 from service and location', () => {
    const href = buildAffiliateUrl(
      'madrid_hero',
      { service: 'fachada', location: 'madrid', placement: 'hero' },
      awinBase,
    );
    assert.equal(params(href).get('clickref3'), 'fachada|madrid');
    assert.equal(params(href).get('clickref2'), 'hero');
  });

  it('sets cons=1 after accepting tracking cookies', () => {
    assert.equal(awinConsentValue('accepted'), '1');
    assert.equal(readConsentFromCookieHeader('ri_consent=accepted'), 'accepted');
    const href = buildAffiliateUrl('home_hero_rehabilitacion', { consent: 'accepted' }, awinBase);
    assert.equal(params(href).get('cons'), '1');
    assert.equal(params(applyAwinConsent(href as string, 'accepted')).get('cons'), '1');
  });

  it('sets cons=0 after rejecting tracking cookies', () => {
    assert.equal(awinConsentValue('rejected'), '0');
    assert.equal(readConsentFromCookieHeader('ri_consent=rejected'), 'rejected');
    const href = buildAffiliateUrl('home_hero_rehabilitacion', { consent: 'rejected' }, awinBase);
    assert.equal(params(href).get('cons'), '0');
    assert.equal(params(applyAwinConsent(href as string, 'rejected')).get('cons'), '0');
  });

  it('does not assume consent when there is no choice', () => {
    assert.equal(awinConsentValue(null), undefined);
    assert.equal(readConsentFromCookieHeader(''), null);
    const href = buildAffiliateUrl('home_hero_rehabilitacion', {}, `${awinBase}&cons=1`);
    assert.equal(params(href).has('cons'), false);
    assert.equal(params(applyAwinConsent(href as string, null)).has('cons'), false);
  });

  it('never builds a direct Habitissimo tracking URL', () => {
    const habitissimo = 'https://www.habitissimo.es/presupuestos/reformas';
    assert.equal(isAwinTrackingUrl(habitissimo), false);
    assert.equal(resolveAffiliateDestination(habitissimo), null);
    assert.equal(resolveAffiliateDestination(''), null);
    const href = buildAffiliateUrl('home_hero_rehabilitacion', {}, awinBase);
    assert.ok(href);
    assert.notEqual(new URL(href).hostname, 'www.habitissimo.es');
    assert.notEqual(new URL(href).hostname, 'habitissimo.es');
    assert.equal(isAwinTrackingUrl('https://www.awin.com/cread.php'), false);
    assert.equal(isAwinTrackingUrl('https://track.awin1.com/cread.php'), false);
    assert.equal(isAwinTrackingUrl('https://go.tidd.ly/abc'), false);
    assert.equal(isAwinTrackingUrl('https://www.awin1.com/cread.php'), true);
    assert.equal(isAwinTrackingUrl('https://tidd.ly/abc'), true);
  });

  it('disables the CTA when PUBLIC_AWIN_URL is empty', () => {
    assert.equal(buildAffiliateUrl('home_hero_rehabilitacion', {}, ''), null);
    assert.equal(affiliateConfig.isConfigured, Boolean(affiliateConfig.trackingUrl));
    if (!affiliateConfig.trackingUrl) {
      assert.equal(affiliateConfig.isConfigured, false);
      assert.equal(buildAffiliateUrl('header_cta'), null);
    }
  });
});
