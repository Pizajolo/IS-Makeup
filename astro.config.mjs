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
      // The integration emits one alternate per locale but no x-default, which
      // the hand-written sitemap did have. Add it back pointing at English.
      serialize(item) {
        if (item.links) {
          item.links = [...item.links, { lang: 'x-default', url: 'https://ismakeup.pt/' }];
        }
        return item;
      },
    }),
  ],
});
