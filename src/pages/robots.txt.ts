import type { APIRoute } from 'astro';
import { absoluteUrl } from '../config/site.config';

export const GET: APIRoute = () => {
  const sitemap = absoluteUrl('/sitemap-index.xml');
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
