import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import remarkDirective from 'remark-directive';
import rehypeAutolinkHeadings from 'rehype-autolink-headings';

import { remarkCallouts } from './src/plugins/remark-callouts.mjs';
import { remarkYouTube } from './src/plugins/remark-youtube.mjs';
import { remarkReadingTime } from './src/plugins/remark-reading-time.mjs';
import { rehypeTableWrap } from './src/plugins/rehype-table-wrap.mjs';
import { rehypeMarkdownFigure } from './src/plugins/rehype-markdown-figure.mjs';

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
  markdown: {
    // remarkDirective has to run before remarkCallouts, which consumes the
    // container nodes it produces.
    remarkPlugins: [remarkDirective, remarkCallouts, remarkYouTube, remarkReadingTime],
    rehypePlugins: [
      [
        rehypeAutolinkHeadings,
        {
          behavior: 'append',
          // Hidden from assistive tech on purpose: the heading text is already
          // the link's accessible context, so exposing it would announce every
          // heading twice. It is a pointer/keyboard convenience, not content.
          properties: { className: ['heading-anchor'], ariaHidden: 'true', tabIndex: -1 },
          content: { type: 'text', value: '#' },
        },
      ],
      rehypeTableWrap,
      rehypeMarkdownFigure,
    ],
  },
  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'en',
        locales: { en: 'en', pt: 'pt', es: 'es' },
      },
      // The integration emits one alternate per locale but no x-default, which
      // the hand-written sitemap did have.
      //
      // It groups pages by swapping the locale prefix, so it only links pages
      // that share a path. Journal URLs deliberately don't — /journal/ against
      // /pt/diario/ — so those get no sitemap alternates and rely on the
      // on-page <link rel="alternate"> tags, which is the signal Google
      // actually reads. x-default therefore has to come from this item's own
      // English alternate rather than a hardcoded homepage URL.
      serialize(item) {
        if (item.links) {
          const english = item.links.find((link) => link.lang === 'en');
          if (english) {
            item.links = [...item.links, { lang: 'x-default', url: english.url }];
          }
        }
        return item;
      },
    }),
  ],
});
