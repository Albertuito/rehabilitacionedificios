export type GeoSection =
  | 'permits'
  | 'climate'
  | 'stock'
  | 'content'
  | 'process'
  | 'photo'
  | 'budget'
  | 'related';

const BASE: GeoSection[] = [
  'permits',
  'climate',
  'stock',
  'content',
  'process',
  'photo',
  'budget',
  'related',
];

function factorial(n: number): number {
  let value = 1;
  for (let i = 2; i <= n; i += 1) value *= i;
  return value;
}

/** Unique permutation of modules per city index. Hero/H1 stays first; FAQ stays last. */
export function geoSectionOrder(index: number): GeoSection[] {
  const remaining = [...BASE];
  const result: GeoSection[] = [];
  let k = index % factorial(remaining.length);
  for (let i = remaining.length; i > 0; i -= 1) {
    const f = factorial(i - 1);
    const pick = Math.floor(k / f);
    result.push(remaining.splice(pick, 1)[0]);
    k %= f;
  }
  return result;
}

export type HeroPattern = 'split' | 'stack' | 'image-first' | 'text-band' | 'narrow';

export function heroPattern(index: number): HeroPattern {
  const patterns: HeroPattern[] = ['split', 'stack', 'image-first', 'text-band', 'narrow'];
  return patterns[index % patterns.length];
}
