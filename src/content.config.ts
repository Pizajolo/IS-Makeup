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
      //
      // The refine catches remote URLs. `image()` lets a URL through as a plain
      // string and `astro check` stays green, but the build then dies inside
      // route generation with a MissingImageDimension error — green locally,
      // red on Cloudflare. Failing here turns that into a readable message
      // before anything is pushed.
      //
      // Remote images are refused rather than supported on purpose: they skip
      // the whole Phase 2 pipeline (no WebP, no srcset, no size control), they
      // break whenever the other host moves the file, and a hotlinked stock
      // photo carries licensing risk on a commercial site.
      // Checks for "://" rather than a leading protocol or the resolved type.
      // `image()` hands refine a string tagged with an internal `__ASTRO_IMAGE_`
      // prefix and only resolves it to ImageMetadata afterwards — so a type
      // check rejects valid local paths, and an anchored `^https?://` never
      // matches at all. A relative path can never contain "://", which makes
      // this independent of Astro's internal tagging.
      heroImage: image().refine((value) => !String(value).includes('://'), {
        message:
          'Cover photo must be an uploaded image, not a link to another website. ' +
          'In the CMS, drag the photo into the Cover photo field instead of pasting a URL.',
      }),
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
