import { getCollection, render, type CollectionEntry } from 'astro:content';
import { journalPath, locales, type Locale } from './site';

export type Post = CollectionEntry<'blog'>;

// Re-exported so callers only need one journal import. The paths themselves
// live in site.ts, which stays free of astro:content.
export { journalPath };

export const POSTS_PER_PAGE = 6;

// Entry ids are always "<locale>/<slug>" — see the glob base in content.config.ts.
export const postLocale = (post: Post): Locale => post.id.split('/')[0] as Locale;
export const postSlug = (post: Post): string => post.id.split('/').slice(1).join('/');
export const postPath = (post: Post): string => `${journalPath[postLocale(post)]}${postSlug(post)}/`;

// A post with no explicit key is its own translation group of one.
export const translationKey = (post: Post): string => post.data.translationKey ?? postSlug(post);

const byNewestFirst = (a: Post, b: Post) => b.data.date.getTime() - a.data.date.getTime();

// Drafts stay visible while running `astro dev` so half-written posts can be
// previewed, and never make it into a production build.
const isPublished = (post: Post) => import.meta.env.PROD === false || post.data.draft === false;

export async function getPosts(locale: Locale): Promise<Post[]> {
  const posts = await getCollection('blog', (post) => postLocale(post) === locale && isPublished(post));
  return posts.sort(byNewestFirst);
}

export async function getAllPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', isPublished);
  return posts.sort(byNewestFirst);
}

/**
 * Paths of this post in the other locales, keyed by locale. Only locales that
 * actually have a translation appear, so hreflang never points at a 404 and
 * the language switcher can fall back to the journal index instead.
 */
export async function getTranslations(post: Post): Promise<Partial<Record<Locale, string>>> {
  const key = translationKey(post);
  const siblings = await getCollection(
    'blog',
    (candidate) => isPublished(candidate) && translationKey(candidate) === key,
  );

  return Object.fromEntries(siblings.map((sibling) => [postLocale(sibling), postPath(sibling)]));
}

/**
 * Values the remark plugins compute from the body rather than frontmatter —
 * reading time, word count, and any YouTube videos the post embeds. Kept out
 * of frontmatter so they are never Inés's job to fill in or keep accurate.
 */
export async function postMeta(post: Post) {
  const { remarkPluginFrontmatter } = await render(post);
  return {
    readingTime: (remarkPluginFrontmatter.readingTime as number) ?? 1,
    words: (remarkPluginFrontmatter.words as number) ?? 0,
    youtubeIds: (remarkPluginFrontmatter.youtubeIds as string[]) ?? [],
  };
}

/** Previous and next post within one locale, for in-body internal linking. */
export function neighbours(posts: Post[], current: Post) {
  const index = posts.findIndex((post) => post.id === current.id);
  return {
    newer: index > 0 ? posts[index - 1] : null,
    older: index >= 0 && index < posts.length - 1 ? posts[index + 1] : null,
  };
}

const dateLocale: Record<Locale, string> = { en: 'en-GB', pt: 'pt-PT', es: 'es-ES' };

export const formatDate = (date: Date, locale: Locale): string =>
  new Intl.DateTimeFormat(dateLocale[locale], {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'UTC',
  }).format(date);

/** ISO date only — what datePublished and <time datetime> both want. */
export const isoDate = (date: Date): string => date.toISOString().slice(0, 10);

export const otherLocales = (locale: Locale): Locale[] => locales.filter((l) => l !== locale);
