import { siteConfig, absoluteUrl } from '../config/site.config';

export interface SeoInput {
  title: string;
  description: string;
  path: string;
  canonical?: string;
  noindex?: boolean;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedAt?: string;
  updatedAt?: string;
}

export function buildTitle(title: string): string {
  if (title.includes(siteConfig.brand.name)) return title;
  return `${title} | ${siteConfig.brand.name}`;
}

export function seoTags(input: SeoInput) {
  const title = buildTitle(input.title);
  const canonical = input.canonical ?? absoluteUrl(input.path);
  const image = absoluteUrl(input.ogImage ?? siteConfig.defaults.ogImage);
  return {
    title,
    description: input.description,
    canonical,
    robots: input.noindex ? 'noindex,nofollow' : 'index,follow',
    ogTitle: title,
    ogDescription: input.description,
    ogType: input.ogType ?? 'website',
    ogImage: image,
    ogUrl: canonical,
    twitterCard: 'summary_large_image',
    publishedAt: input.publishedAt,
    updatedAt: input.updatedAt,
  };
}
