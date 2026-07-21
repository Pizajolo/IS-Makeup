import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Site URLs must keep the shape the hand-written site already used:
// English at /, Portuguese at /pt/, Spanish at /es/.
export default defineConfig({
  site: 'https://ismakeup.pt',
  trailingSlash: 'always',
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'pt', 'es'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', pt: 'pt', es: 'es' },
      },
    }),
  ],
});
