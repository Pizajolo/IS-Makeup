import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// One file per locale under src/content/blog/{en,pt,es}/, so the entry id is
// always "<locale>/<slug>" and the slug itself can be localised for search.
//
// Frontmatter is metadata only. Everything visual — subheadings, images,
// tables, links, videos — lives in the markdown body, in whatever order and
// quantity Inés wants. A fixed field list would cap her at one hero image in
// one position, which is the thing this design exists to avoid.
const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.md' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      updated: z.coerce.date().optional(),

      // The card grid, the OG tag and the RSS enclosure all need a guaranteed
      // image, which is why this one stays in frontmatter rather than the body.
      heroImage: image(),
      // Required on purpose. Alt text is the field everyone skips, and a
      // build error is the only reliable way to stop that happening.
      heroAlt: z.string().min(1, 'heroAlt is required — describe the image for screen readers'),

      tags: z.array(z.string()).default([]),
      draft: z.boolean().default(false),

      // Ties the same post together across locales for hreflang and the
      // language switcher. Falls back to the slug when absent, so a post that
      // only exists in one language needs no ceremony.
      translationKey: z.string().optional(),

      // Locations are content, not routes. A post written for a place carries
      // that place here and gets contentLocation in its schema; there is no
      // separate location page template to keep in sync.
      location: z.string().optional(),
    }),
});

export const collections = { blog };
