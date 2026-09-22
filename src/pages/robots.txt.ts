import type { APIRoute } from 'astro';
import { absoluteUrl, shouldIndex } from '../config/site.config';

export const GET: APIRoute = () => {
  if (!shouldIndex()) {
    return new Response(
      `User-agent: *
Disallow: /

# Indexación bloqueada: faltan dominio final, datos legales o PUBLIC_SITE_URL.
`,
      { headers: { 'Content-Type': 'text/plain; charset=utf-8' } },
    );
  }

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
