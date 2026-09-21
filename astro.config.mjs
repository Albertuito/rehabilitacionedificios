// @ts-check
import { defineConfig } from 'astro/config';
import preact from '@astrojs/preact';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import { siteConfig } from './site.config';
import tailwindcss from '@tailwindcss/vite';

const geo301 = {
  '/reformas-integrales/madrid/': '/rehabilitacion-edificios/madrid/',
  '/reformas-integrales/barcelona/': '/rehabilitacion-edificios/barcelona/',
  '/reformas-integrales/valencia/': '/rehabilitacion-edificios/valencia/',
  '/reformas-integrales/sevilla/': '/rehabilitacion-edificios/sevilla/',
  '/reformas-integrales/malaga/': '/rehabilitacion-edificios/malaga/',
  '/reformas-integrales/alicante/': '/rehabilitacion-edificios/alicante/',
  '/reformas-integrales/zaragoza/': '/rehabilitacion-edificios/zaragoza/',
  '/reformas-integrales/murcia/': '/rehabilitacion-edificios/murcia/',
  '/reformas-integrales/palma/': '/rehabilitacion-edificios/palma/',
  '/reformas-integrales/las-palmas/': '/rehabilitacion-edificios/las-palmas/',
  '/reformas-integrales/santa-cruz-tenerife/': '/rehabilitacion-edificios/santa-cruz-tenerife/',
  '/reformas-integrales/a-coruna/': '/rehabilitacion-edificios/a-coruna/',
  '/reformas-integrales/valladolid/': '/rehabilitacion-edificios/valladolid/',
  '/reformas-integrales/granada/': '/rehabilitacion-edificios/granada/',
  '/reformas-integrales/cordoba/': '/rehabilitacion-edificios/cordoba/',
  '/reformas-integrales/cadiz/': '/rehabilitacion-edificios/cadiz/',
  '/reformas-integrales/tarragona/': '/rehabilitacion-edificios/tarragona/',
  '/reformas-integrales/girona/': '/rehabilitacion-edificios/girona/',
  '/reformas-integrales/toledo/': '/rehabilitacion-edificios/toledo/',
  '/reformas-integrales/salamanca/': '/rehabilitacion-edificios/salamanca/',
  '/reformas-integrales/bilbao/': '/rehabilitacion-edificios/bizkaia/',
  '/reformas-integrales/vigo/': '/rehabilitacion-edificios/pontevedra/',
  '/reformas-integrales/gijon/': '/rehabilitacion-edificios/asturias/',
  '/reformas-integrales/oviedo/': '/rehabilitacion-edificios/asturias/',
  '/reformas-integrales/santander/': '/rehabilitacion-edificios/cantabria/',
  '/reformas-integrales/pamplona/': '/rehabilitacion-edificios/navarra/',
  '/reformas-integrales/san-sebastian/': '/rehabilitacion-edificios/gipuzkoa/',
  '/reformas-integrales/vitoria-gasteiz/': '/provincias/',
  '/reformas-integrales/jerez-de-la-frontera/': '/rehabilitacion-edificios/cadiz/',
  '/reformas-integrales/marbella/': '/rehabilitacion-edificios/malaga/',
  '/reformas-integrales/leon/': '/rehabilitacion-edificios/leon/',
  '/reformas-integrales/almeria/': '/rehabilitacion-edificios/almeria/',
  '/reformas-integrales/huelva/': '/rehabilitacion-edificios/huelva/',
  '/reformas-integrales/badajoz/': '/rehabilitacion-edificios/badajoz/',
};

export default defineConfig({
  site: siteConfig.siteUrl,
  trailingSlash: 'always',
  integrations: [
    preact(),
    mdx(),
    sitemap({
      filter: (page) =>
        !['/design-system', '/aviso-legal', '/privacidad', '/cookies', '/404'].some((part) => page.includes(part)),
    }),
  ],
  redirects: {
    '/reformas-integrales/': '/servicios/rehabilitacion-integral-edificios/',
    '/ciudades/': '/provincias/',
    '/calculadora-reforma/': '/calculadora/',
    '/precio-reforma-integral/': '/guias/cuanto-cuesta-rehabilitar-edificio/',
    '/metodologia-precios/': '/precios/',
    '/cocinas/': '/servicios/',
    '/banos/': '/servicios/',
    '/baños/': '/servicios/',
    '/reformas-cocinas/': '/servicios/',
    '/reformas-banos/': '/servicios/',
    '/reformas-interiores/': '/servicios/',
    '/interiorismo/': '/guias/',
    ...geo301,
  },
  build: {
    inlineStylesheets: 'auto',
    format: 'directory',
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
