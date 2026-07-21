import rss from '@astrojs/rss';
import { getPosts, postPath } from './journal';
import { site, type Locale } from './site';
import type { Content } from '../i18n/en';

/**
 * One feed per language rather than one mixed feed — a reader subscribed to
 * the Portuguese journal has no use for the English posts.
 */
export async function journalFeed(locale: Locale, content: Content, context: { site?: URL }) {
  const posts = await getPosts(locale);

  return rss({
    title: `${site.brandName} — ${content.journal.title}`,
    description: content.journal.description,
    site: context.site ?? site.url,
    trailingSlash: true,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.date,
      link: postPath(post),
      categories: post.data.tags,
    })),
    customData: `<language>${content.htmlLang}</language>`,
  });
}
