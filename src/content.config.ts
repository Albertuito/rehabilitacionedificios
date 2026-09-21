import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
  h1: z.string(),
  primaryKeyword: z.string(),
  searchIntent: z.enum(['transactional', 'commercial', 'informational']),
  layoutId: z.string(),
  path: z.string(),
  pageType: z.enum(['service', 'guide', 'hub', 'geo']),
  authorId: z.string(),
  reviewerId: z.string().optional(),
  publishedAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  reviewAfter: z.coerce.date(),
  sources: z.array(z.string()),
  relatedPages: z.array(z.string()),
  ctaLabel: z.string(),
  clickref: z.string(),
  answer: z.string(),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
});

export const collections = {
  services: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/services' }),
    schema: pageSchema,
  }),
  guides: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
    schema: pageSchema,
  }),
  locations: defineCollection({
    loader: glob({ pattern: '**/*.mdx', base: './src/content/locations' }),
    schema: pageSchema.extend({
      citySlug: z.string(),
      layoutVariant: z.string(),
    }),
  }),
};
