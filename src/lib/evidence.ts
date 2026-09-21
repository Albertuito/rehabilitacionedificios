import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { parse } from 'yaml';

export interface EvidenceItem {
  id: string;
  claim: string;
  status: 'draft' | 'verified' | 'expired';
  sourceType: string;
  sourcePath: string;
  scope: 'brand' | 'page' | 'partner';
  verifiedAt: string;
  expiresAt: string;
  publicWording: string;
}

interface EvidenceFile {
  items: EvidenceItem[];
}

const evidencePath = resolve(dirname(fileURLToPath(import.meta.url)), '../data/evidence.yml');

export function loadEvidence(): EvidenceItem[] {
  const parsed = parse(readFileSync(evidencePath, 'utf8')) as EvidenceFile;
  return parsed.items ?? [];
}

export function getVerifiedEvidence(id: string): EvidenceItem | undefined {
  const now = new Date();
  return loadEvidence().find(
    (item) => item.id === id && item.status === 'verified' && new Date(item.expiresAt) > now,
  );
}
