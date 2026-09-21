import type { APIRoute } from 'astro';
import { siteConfig } from '../config/site.config';

export const GET: APIRoute = () => {
  const sitemap = new URL('/sitemap-index.xml', siteConfig.siteUrl).toString();
  const body = `User-agent: *
Allow: /
Disallow: /aviso-legal/
Disallow: /privacidad/
Disallow: /cookies/
Disallow: /design-system/
Disallow: /*?*

Sitemap: ${sitemap}
`;
  return new Response(body, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
