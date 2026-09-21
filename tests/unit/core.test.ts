import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { estimateRehab, formatEuro } from '../../src/lib/pricing';
import { trackingMap } from '../../src/data/tracking';
import { locations } from '../../src/data/locations';
import { buildAffiliateUrl } from '../../src/lib/affiliate';
import { geoSectionOrder } from '../../src/lib/location-layout';

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

describe('affiliate', () => {
  it('marks destination with clickref even without Awin ids', () => {
    const url = buildAffiliateUrl('home_hero_rehabilitacion');
    assert.ok(url.includes('clickref=home_hero_rehabilitacion'));
  });
});
