#!/usr/bin/env node
//
// Translates one journal post into other languages, as drafts.
//
//   node scripts/translate.mjs --post wedding-makeup-that-lasts-all-day --to pt,es
//
// Source language is inferred from where the post lives, so Inés can write in
// whichever language suits the post rather than being forced through English.
// Output is always draft:true — nothing this script writes reaches the live
// site until a human opens it in the CMS and turns the toggle off.

import { readFile, writeFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { parseArgs } from 'node:util';
import Anthropic from '@anthropic-ai/sdk';
import YAML from 'yaml';
import { glossaryFor } from './glossary.mjs';

// Pinned deliberately. Model choice is a cost/quality tradeoff, and at roughly
// $0.07 per language per post there is no reason to trade quality for cost.
const MODEL = 'claude-opus-4-8';

const BLOG_DIR = resolve('src/content/blog');
const LOCALES = ['en', 'pt', 'es'];

// The variants matter. The existing site copy is European Portuguese
// ("maquilhagem", "está a produzir") and Mexican Spanish ("platiquemos",
// "playera") — Inés is from Guadalajara. A translation into Brazilian
// Portuguese or peninsular Spanish would read wrong next to everything else.
const LOCALE_NAMES = {
  en: 'English (UK spelling — "colour", "specialise")',
  pt: 'European Portuguese as spoken in Portugal — "maquilhagem" not the Brazilian "maquiagem", "está a produzir" not "está produzindo"',
  es: 'Mexican Spanish as spoken in Guadalajara — the register the rest of the site uses ("platiquemos", "apartar tu fecha", "playera"), not peninsular Spanish',
};

// Locale prefix for internal links back into the main site.
const SITE_PREFIX = { en: '/', pt: '/pt/', es: '/es/' };

const TRANSLATION_SCHEMA = {
  type: 'object',
  properties: {
    slug: {
      type: 'string',
      description:
        'URL slug in the target language: lowercase, hyphen-separated, no accents or punctuation. Should carry the post\'s main keyword so the URL reads meaningfully in that language.',
    },
    title: { type: 'string' },
    description: { type: 'string' },
    heroAlt: { type: 'string' },
    tags: { type: 'array', items: { type: 'string' } },
    body: {
      type: 'string',
      description: 'The full markdown body, structurally identical to the source.',
    },
  },
  required: ['slug', 'title', 'description', 'heroAlt', 'tags', 'body'],
  additionalProperties: false,
};

// ---------------------------------------------------------------- helpers

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/;

export function splitFrontmatter(raw) {
  const match = raw.match(FRONTMATTER);
  if (!match) throw new Error('No frontmatter found — is this a post?');
  return { data: YAML.parse(match[1]), body: raw.slice(match[0].length).trim() };
}

/** The yaml package parses `2026-05-14` as a string, but tolerate a Date too. */
const isoDate = (value) =>
  value instanceof Date ? value.toISOString().slice(0, 10) : String(value);

/**
 * Normalise whatever the model proposed into a safe filename. Done here rather
 * than trusted to the prompt — an accented or punctuated slug would produce a
 * URL that breaks quietly.
 */
export const slugify = (text) =>
  text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '') // strip combining accents: "maquilhagem" survives, "é" becomes "e"
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);

export async function findPost(needle) {
  // Accept "en/my-post.md", "en/my-post", or a bare slug.
  const direct = needle.endsWith('.md') ? needle : `${needle}.md`;
  if (existsSync(join(BLOG_DIR, direct))) {
    const [locale, file] = direct.split('/');
    return { locale, slug: file.replace(/\.md$/, ''), path: join(BLOG_DIR, direct) };
  }

  const matches = [];
  for (const locale of LOCALES) {
    const dir = join(BLOG_DIR, locale);
    if (!existsSync(dir)) continue;
    for (const file of await readdir(dir)) {
      if (file === `${needle}.md`) {
        matches.push({ locale, slug: needle, path: join(dir, file) });
      }
    }
  }

  if (matches.length === 0) throw new Error(`No post found matching "${needle}".`);
  if (matches.length > 1) {
    const where = matches.map((m) => `${m.locale}/${m.slug}`).join(', ');
    throw new Error(`"${needle}" is ambiguous — exists as ${where}. Pass the locale, e.g. en/${needle}.`);
  }
  return matches[0];
}

// ---------------------------------------------------------------- the prompt

function systemPrompt(from, to) {
  return `You translate blog posts for I.S Makeup, the site of Inés Santiago, a bridal makeup artist based in Lisbon and born in Guadalajara, Mexico.

Translate from ${LOCALE_NAMES[from]} into ${LOCALE_NAMES[to]}.

VOICE
The posts are written in Inés's own first person — warm, direct, specific, and unhurried. She is a working artist talking to a bride, not a brand talking to a market. Keep contractions and asides. Where the source is plain, stay plain; do not smooth her voice into marketing copy, and do not add enthusiasm she did not write.

Translate the meaning, not the words. Idioms should become the natural equivalent in the target language, not a literal rendering. If a sentence would sound stilted translated directly, rewrite it so it reads as though she wrote it in that language to begin with.

GLOSSARY
${glossaryFor(to)}

STRUCTURE — the body must survive intact
The markdown is processed by a build pipeline. Breaking these breaks the page:

- Keep every heading at exactly its source level (## stays ##, ### stays ###). Translate the heading text.
- Keep tables the same shape — same column count, same row count, same separator line. Translate the cell contents.
- Callouts look like \`:::note\`, \`:::tip[Label]\` or \`:::warning\` and close with \`:::\`. Never translate the directive name (\`note\`, \`tip\`, \`warning\`). Do translate the label in square brackets when one is present.
- Images look like \`![alt text](../../../assets/blog/photo.jpg "Optional caption")\`. Translate the alt text and the caption. Never change the path.
- A YouTube URL alone on its own line becomes an embedded player at build time. Reproduce such lines byte for byte — do not translate, annotate, or wrap them.
- Preserve bold, italic, ordered and unordered lists, and blockquotes.
- Internal links point at the main site with a locale prefix — \`${SITE_PREFIX[from]}\` in the source. Rewrite these to \`${SITE_PREFIX[to]}\` (for example \`${SITE_PREFIX[from]}#services\` becomes \`${SITE_PREFIX[to]}#services\`). Translate the link text; leave external URLs alone.
- Do not add, remove, merge or reorder sections. The translation should have the same shape as the source.

SLUG
Propose a slug in the target language: lowercase, hyphen-separated, no accents. It should carry the post's main keyword — this becomes the public URL, so it is worth getting right for search.`;
}

async function translateOne(client, post, from, to) {
  const response = await client.messages.create({
    model: MODEL,
    max_tokens: 16000,
    thinking: { type: 'adaptive' },
    output_config: {
      effort: 'high',
      format: { type: 'json_schema', schema: TRANSLATION_SCHEMA },
    },
    system: systemPrompt(from, to),
    messages: [
      {
        role: 'user',
        content: `Translate this post.

TITLE: ${post.data.title}
DESCRIPTION: ${post.data.description}
COVER PHOTO DESCRIPTION: ${post.data.heroAlt}
TAGS: ${(post.data.tags ?? []).join(', ')}

BODY:
${post.body}`,
      },
    ],
  });

  const text = response.content.find((block) => block.type === 'text')?.text;
  if (!text) throw new Error(`Model returned no text (stop_reason: ${response.stop_reason}).`);

  return { result: JSON.parse(text), usage: response.usage };
}

// ---------------------------------------------------------------- output

export function renderPost(source, translated) {
  const frontmatter = {
    title: translated.title,
    description: translated.description,
    date: isoDate(source.data.date),
    ...(source.data.updated && { updated: isoDate(source.data.updated) }),
    heroImage: source.data.heroImage,
    heroAlt: translated.heroAlt,
    tags: translated.tags,
    ...(source.data.location && { location: source.data.location }),
    // Always a draft. This is the whole safety model: a machine translation is
    // invisible on the live site until Inés reads it and turns this off.
    draft: true,
    // Ties the translation to its siblings. Falls back to the source slug,
    // which is what Sveltia's canonical_slug default would have written.
    translationKey: source.data.translationKey ?? source.slug,
  };

  const yaml = YAML.stringify(frontmatter, { lineWidth: 0 }).trimEnd();
  return `---\n${yaml}\n---\n\n${translated.body.trim()}\n`;
}

// ---------------------------------------------------------------- main

async function main() {
  const { values } = parseArgs({
    options: {
      post: { type: 'string' },
      to: { type: 'string' },
      force: { type: 'boolean', default: false },
      'dry-run': { type: 'boolean', default: false },
    },
  });

  if (!values.post || !values.to) {
    console.error('Usage: node scripts/translate.mjs --post <slug> --to pt,es [--force] [--dry-run]');
    process.exit(1);
  }

  const found = await findPost(values.post);
  const raw = await readFile(found.path, 'utf8');
  const source = { ...found, ...splitFrontmatter(raw) };

  const targets = values.to
    .split(',')
    .map((locale) => locale.trim())
    .filter(Boolean);

  for (const target of targets) {
    if (!LOCALES.includes(target)) throw new Error(`Unknown locale "${target}".`);
    if (target === source.locale) throw new Error(`Source and target are both "${target}".`);
  }

  console.log(`Source: ${source.locale}/${source.slug} — "${source.data.title}"`);
  console.log(`Targets: ${targets.join(', ')}\n`);

  const client = new Anthropic();
  let written = 0;

  for (const target of targets) {
    process.stdout.write(`  ${target}: translating…`);

    const { result, usage } = await translateOne(client, source, source.locale, target);
    const slug = slugify(result.slug);
    if (!slug) throw new Error(`Model proposed an unusable slug: "${result.slug}"`);

    const outPath = join(BLOG_DIR, target, `${slug}.md`);
    const rendered = renderPost(source, result, target);

    if (existsSync(outPath) && !values.force) {
      console.log(`\r  ${target}: already exists at ${target}/${slug}.md — skipped (use --force to overwrite)`);
      continue;
    }

    if (values['dry-run']) {
      console.log(`\r  ${target}: would write ${target}/${slug}.md (${usage.input_tokens} in / ${usage.output_tokens} out)`);
      continue;
    }

    await writeFile(outPath, rendered, 'utf8');
    written += 1;
    console.log(`\r  ${target}: wrote ${target}/${slug}.md (${usage.input_tokens} in / ${usage.output_tokens} out)`);
  }

  if (written > 0) {
    console.log(`\n${written} draft${written === 1 ? '' : 's'} written. Review in the CMS before publishing.`);
  }
}

// Only run when invoked directly, so the helpers above can be imported and
// tested without firing an API call. pathToFileURL rather than string
// concatenation: this repo's path contains a space, which import.meta.url
// percent-encodes and a hand-built `file://${argv[1]}` does not — the naive
// comparison silently never matches.
if (import.meta.url === pathToFileURL(process.argv[1]).href) {
  main().catch(reportAndExit);
}

function reportAndExit(error) {
  // Typed SDK errors carry more than the message — surface what is actionable.
  if (error instanceof Anthropic.AuthenticationError) {
    console.error('\nAuthentication failed — is ANTHROPIC_API_KEY set correctly?');
  } else if (error instanceof Anthropic.RateLimitError) {
    console.error('\nRate limited. Wait a moment and run again.');
  } else if (error instanceof Anthropic.APIError) {
    console.error(`\nAPI error ${error.status}: ${error.message}`);
  } else {
    console.error(`\n${error.message}`);
  }
  process.exit(1);
}
