import { absoluteUrl, siteConfig } from '../config/site.config';
import { getPerson } from '../data/authors';

interface JsonLd {
  '@context': 'https://schema.org';
  '@graph': Record<string, unknown>[];
}

export function organizationNode(): Record<string, unknown> {
  return {
    '@type': 'Organization',
    '@id': `${siteConfig.siteUrl}/#organization`,
    name: siteConfig.brand.name,
    url: siteConfig.siteUrl,
    logo: absoluteUrl('/favicon.svg'),
    description: siteConfig.brand.promise,
  };
}

export function websiteNode(): Record<string, unknown> {
  return {
    '@type': 'WebSite',
    '@id': `${siteConfig.siteUrl}/#website`,
    name: siteConfig.brand.name,
    url: siteConfig.siteUrl,
    publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
    inLanguage: siteConfig.language,
  };
}

export function webPageNode(input: {
  name: string;
  description: string;
  path: string;
  type?: 'WebPage' | 'CollectionPage';
}): Record<string, unknown> {
  return {
    '@type': input.type ?? 'WebPage',
    '@id': `${absoluteUrl(input.path)}#webpage`,
    name: input.name,
    description: input.description,
    url: absoluteUrl(input.path),
    isPartOf: { '@id': `${siteConfig.siteUrl}/#website` },
    publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
    inLanguage: siteConfig.language,
  };
}

export function breadcrumbNode(items: { name: string; path: string }[]): Record<string, unknown> {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleNode(input: {
  headline: string;
  description: string;
  path: string;
  datePublished: string;
  dateModified: string;
  authorId: string;
  image?: string;
}): Record<string, unknown> {
  const author = getPerson(input.authorId);
  return {
    '@type': 'Article',
    headline: input.headline,
    description: input.description,
    datePublished: input.datePublished,
    dateModified: input.dateModified,
    author: { '@type': 'Person', name: author?.name ?? 'Equipo editorial' },
    publisher: { '@id': `${siteConfig.siteUrl}/#organization` },
    image: input.image,
    mainEntityOfPage: absoluteUrl(input.path),
  };
}

export function faqNode(faqs: { question: string; answer: string }[]): Record<string, unknown> {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer', text: faq.answer },
    })),
  };
}

export function jsonLd(graph: Record<string, unknown>[]): string {
  const payload: JsonLd = { '@context': 'https://schema.org', '@graph': graph };
  return JSON.stringify(payload);
}
