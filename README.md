# Rehabilita tu Edificio

Plataforma nacional informativa de rehabilitación de edificios y comunidades de propietarios. Ayuda a encontrar y comparar empresas especializadas a través de Habitissimo. No ejecuta obras ni se presenta como constructora.

## Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

Abre `http://localhost:4321`.

## Variables

Configuración en `src/config/site.config.ts`, `src/config/affiliate.config.ts` y `.env`:

| Variable | Uso |
| --- | --- |
| `PUBLIC_SITE_URL` | Origen canónico HTTPS |
| `PUBLIC_LEGAL_NAME` / `PUBLIC_TAX_ID` | Titular del aviso legal |
| `PUBLIC_CONTACT_EMAIL` / `PUBLIC_POSTAL_ADDRESS` | Contacto |
| `PUBLIC_HOSTING` | Alojamiento |
| `PUBLIC_AWIN_MID` / `PUBLIC_AWIN_AFFID` | IDs de Awin |
| `PUBLIC_AFFILIATE_DESTINATION` | Destino Habitissimo |
| `PUBLIC_GTM_ID` | Google Tag Manager (solo con consentimiento) |
| `PUBLIC_GA_ID` | Google Analytics 4 (solo con consentimiento) |
| `PUBLIC_CLARITY_ID` | Microsoft Clarity opcional |
| `PUBLIC_GSC_VERIFICATION` | Meta de Google Search Console |

Marca provisional: `Rehabilita tu Edificio` en `src/config/site.config.ts`. Enlace de afiliado único en `src/config/affiliate.config.ts`.

## Comandos

```bash
npm run test
npm run build
npm run check:links
npm run check:meta
npm run check:schema
```
