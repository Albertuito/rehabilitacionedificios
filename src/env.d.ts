/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_SITE_URL?: string;
  readonly PUBLIC_CONTACT_EMAIL?: string;
  readonly PUBLIC_POSTAL_ADDRESS?: string;
  readonly PUBLIC_LEGAL_NAME?: string;
  readonly PUBLIC_TAX_ID?: string;
  readonly PUBLIC_HOSTING?: string;
  readonly PUBLIC_REGISTRY?: string;
  readonly PUBLIC_AWIN_URL?: string;
  readonly PUBLIC_GTM_ID?: string;
  readonly PUBLIC_GA_ID?: string;
  readonly PUBLIC_CLARITY_ID?: string;
  readonly PUBLIC_GSC_VERIFICATION?: string;
  readonly PUBLIC_TWITTER?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
