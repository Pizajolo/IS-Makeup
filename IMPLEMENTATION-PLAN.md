# I.S Makeup — Blog & CMS Implementation Plan

**Stack:** Astro · Sveltia CMS · Cloudflare Pages · YouTube (watchable video) + self-hosted compressed loops (atmosphere)

**Goal:** Inés publishes multilingual posts herself through a friendly admin UI. Everything lands in git, Cloudflare Pages rebuilds, output is static and SEO-optimal.

---

## Phase 0 — Safety & prerequisites

Nothing else starts until the current work is safe in git.

- [x] Commit the current site — `styles.css`, `script.js`, `es/`, `pt/`, `sitemap.xml`, `robots.txt` were untracked and `index.html` was modified (commit `3286e8a`)
- [x] Add `.gitignore` for macOS cruft and Astro build output
- [x] Decide on `tweaks-panel.jsx` (currently deleted in working tree) — confirm it's intentionally gone
- [x] **Decide where media lives** — resolved: optimized images tracked in `src/assets/` (720 KB); video stays untracked pending shorter replacements

---

## Phase 1 — Astro foundation

Collapse three near-identical HTML files into one templated site. No blog yet.

- [x] Scaffold Astro in the repo (Astro 5.18.2, `@astrojs/sitemap`)
- [x] Configure i18n: `en` at `/`, `pt` at `/pt/`, `es` at `/es/` — match the existing URL structure exactly
- [x] Build a shared `Layout.astro` holding the `<head>`: canonical, hreflang, OG/Twitter, geo tags, theme-color
- [x] Port the JSON-LD `@graph` into `Schema.astro`, driven by per-locale data; FAQPage is generated from the visible FAQ so the two cannot drift
- [x] Move page copy into per-language content files (`src/i18n/{en,pt,es}.ts`); `Content` derives from `en.ts` so a missing translation key is a build error
- [x] Port the six sections plus topbar, marquee, testimonial, CTA and footer as components
- [x] Port `script.js` behaviour (kept in `public/`, inline `onclick` preserved)
- [x] Keep `styles.css` as-is — now bundled and content-hashed by Astro
- [x] Wire `@astrojs/sitemap` with hreflang output; delete the hand-written `sitemap.xml`
- [x] Verify all three languages render identically — en 1124 / pt 1255 / es 1290 words, all exact matches
- [x] `astro check` passes: 0 errors, 0 warnings across 25 files
- [ ] Run the rendered output through Google's Rich Results Test — blocked until the site is deployed and reachable (Phase 6)

---

## Phase 2 — Media cleanup

- [x] Switch images to Astro's `<Image>` with responsive `srcset` — homepage image payload 703 KB → 118 KB mobile / 286 KB desktop
- [x] Commit optimized images to `src/assets/` (720 KB) so Cloudflare Pages has something to deploy
- [x] Confirm loops use `muted loop playsinline` and carry no player chrome — verified, already correct
- [ ] Add `poster` images and `preload="none"` to decorative video — **deferred**: these two are coupled (`preload="none"` without a poster shows a blank frame), and posters would go stale as soon as the videos are replaced
- [ ] Replace reel1/2/4 with shorter clips, then generate posters and set `preload="none"`

**Video findings (measured, not estimated):**

| file | duration | size | notes |
|---|---|---|---|
| `reel1.mp4` | 105s | 28 MB | tap-to-play, not a loop |
| `reel2.mp4` | 45s | 10 MB | tap-to-play |
| `reel4.mp4` | 45s | 7.6 MB | tap-to-play |
| `reel3.mp4` | 18.7s | 524 KB | the autoplay decorative loop — already fine |

The `out_crf*.mp4` experiments tuned the wrong dial. All four carry AAC audio despite being `muted` in markup, but stripping it only saves ~1.6 MB — the cost is duration, not encoding. Best realistic self-host for `reel1` is 9 MB at 540×960 crf32, with visible quality loss. Anything longer than ~15s belongs on YouTube.

`reel3` drops 524 KB → 300 KB from `-an` alone, with zero quality loss, whenever you want that.

---

## Phase 3 — Content architecture ✅

**Posts are documents, not forms.** Frontmatter carries metadata only; everything visual lives in the markdown body, so Inés can put subtitles, images, tables, links and videos wherever she wants, as many times as she wants. A fixed field list would cap her at one hero image and one video in one position — that's the thing to avoid.

**Decisions taken during implementation** — these supersede what this section originally planned:

- **Localised slugs.** `/journal/`, `/pt/diario/`, `/es/diario/` — the keyword sits in the URL in the reader's own language. Costs the automatic hreflang grouping in `@astrojs/sitemap`, which only links pages sharing a path; the on-page `<link rel="alternate">` tags carry it instead, and those are the signal Google actually reads.
- **No location page template.** Locations aren't fixed and the journal isn't about them — it's dynamic tips. A post written for a place carries an optional `location` field and emits `contentLocation` in its schema. Same local-SEO intent, no parallel template to keep in sync.
- **Journal in the topbar** as a seventh item, plus a latest-posts section on the homepage. Section anchors go absolute off the homepage so one topbar works everywhere. Homepage sections renumbered: Journal 05, FAQ 06, Let's talk 07.

### Collection schema

- [x] Define the blog collection with the Astro 5 `glob()` loader, one file per locale (`src/content/blog/{en,pt,es}/`)
- [x] Keep frontmatter to metadata only: `title`, `description`, `date`, `heroImage`, `heroAlt`, `tags`, `draft` — plus `updated`, `translationKey` and `location`
- [x] Make `heroAlt` a **required** field — enforced validation, since alt text is the thing everyone skips
- [x] Keep `heroImage` in frontmatter (the card grid and OG tags need a guaranteed image), but drop `youtubeUrl` — video moves into the body

### Body rendering

- [x] Use plain `.md`, **not** `.mdx`
- [x] Confirm GFM tables render out of the box (Astro default)
- [x] Confirm relative images in markdown are optimized by Sharp automatically — verified, WebP + `srcset` inside post bodies
- [x] Write a remark plugin: a bare YouTube URL alone on its own line becomes a lazy `youtube-nocookie` embed (`rel=0`). The plugin only detects the videos; the post template builds the `VideoObject`, because Google requires `name`/`description`/`uploadDate` and only the post knows those
- [x] Accept that the embed only renders on the built page, not in the CMS editor — demo once in Phase 7
- [x] Add heading anchors and wrap wide tables in an `overflow-x` container
- [x] Style the rendered body with a single `.prose` wrapper — a three-column grid holds text at ~66ch while photos, tables and embeds run wider
- [x] `remark-directive` for `:::note` / `:::tip` / `:::warning` callouts — labels are author-typed only (`:::tip[Dica]`), never generated, so callouts need no per-locale strings
- [x] Bonus: a lone markdown image becomes a `<figure>`, and `![alt](img.jpg "Caption")` renders a caption

### Templates and plumbing

- [x] Build the post template with `BlogPosting` schema (author, datePublished, image, inLanguage) + `BreadcrumbList` + `VideoObject`
- [x] Build the blog index with pagination (6 per page)
- [x] ~~Build the location page template~~ — dropped, see decisions above
- [x] ~~Write location pages for Sintra, Cascais, Comporta, Algarve, Porto~~ — dropped; location-targeted posts carry `location` instead
- [x] Add internal links from posts back to services and contact — a closing CTA block on every post, plus prev/next
- [x] Add RSS via `@astrojs/rss` — one feed per locale, discoverable from every page's `<head>`
- [x] Add blog pages to the generated sitemap — all 12 pages present
- [x] Integrate the blog into site navigation across all three languages — topbar, footer, homepage teaser
- [x] Reading time and word count computed from the body by a remark plugin, never a frontmatter field Inés has to maintain

**Verified:** `astro check` clean across 48 files; 12 pages build; the three homepages diffed against the pre-Phase-3 build with every change intentional and the JSON-LD byte-identical; post hreflang resolves to real translated URLs; rendered output inspected in a browser at desktop and mobile widths.

**Left open:**

- The seed posts embed a placeholder YouTube video (Blender's *Big Buck Bunny*, `aqz-KE-bpKQ`) purely to demonstrate the embed. **Replace with real footage before launch.**
- `npm audit` reports pre-existing high-severity advisories in Astro 5.x, fixed in 7.x. Unrelated to Phase 3 — an Astro major upgrade is its own task.

---

## Phase 4 — Sveltia CMS

Config is committed. The remaining items need GitHub and Cloudflare accounts, so
they're yours to do — steps are in [CMS-SETUP.md](CMS-SETUP.md).

**Two findings that changed this phase:**

- **Sveltia has not implemented editorial workflow** (their docs say it's coming before 1.0). The `draft` boolean already in the Phase 3 schema covers the stated goal — saving half-finished posts — and the build already excludes drafts from production. What's missing is the approval gate: saves land on `main` directly. Revisit when Sveltia ships it; it's a one-line config change.
- **No preview pane, deliberately.** The post template is Astro-rendered, so a preview would be a second hand-written copy that drifts — the exact failure Phase 1 fixed for the FAQ schema. The Cloudflare preview deployment is the honest substitute.

Localized slugs survived the move to the CMS: Sveltia's `{{title | localize}}` links translations through a `translationKey` property, which is the field name Phase 3 already chose. The seed posts' keys were realigned to the English slug so a CMS edit can't break the link.

- [ ] Register a GitHub OAuth app for the site
- [ ] Deploy the OAuth proxy as a Cloudflare Worker
- [x] Add `/admin` with the Sveltia config — [`public/admin/`](public/admin/), version-pinned, `noindex` + disallowed in robots.txt
- [x] Configure i18n so EN/PT/ES fields appear side by side in one editor — `multiple_folders`, matching the folders Phase 3 created
- [x] ~~Enable editorial workflow~~ — unavailable; `draft: true`, on by default for new posts, so nothing goes live by accident
- [x] Configure the rich text editor over the single markdown **body** field — `rich_text` first so she never sees markdown, `raw` kept only as an escape hatch
- [ ] Verify the WYSIWYG covers headings, bold/italic, links, lists, tables and drag-drop images without dropping to source view — **needs a live login; tables are the one I'd check first**
- [x] ~~Set up live preview against the real post template~~ — dropped, see above
- [x] Configure media: drag-drop image upload with a size cap, committed to a defined `assets/` path — uploads are converted to WebP and capped at 2048px **in the browser**, so a 12MP phone photo can't reach git
- [x] **Video is a pasted YouTube URL, never a file upload** — no video widget exists in the config; the only path is the body link
- [ ] Grant Inés repo access at the minimum level that works — Write, which is the floor for committing
- [ ] Test the full flow end to end as a non-admin user

**Verify before handoff** — Sveltia's *Work with Local Repository* mode exercises all of this with no GitHub, Worker or token needed (`npm run dev`, then `/admin/index.html` in Chrome; see [CMS-SETUP.md](CMS-SETUP.md) step 0): that relative `media_folder` resolves so body images land in `src/assets/blog/` and stay Astro-optimised; that `i18n: duplicate` keeps one cover photo across locales while the text translates; that the rich text toolbar has a table button.

---

## Phase 5 — AI translation assist

Drafts only. Inés reviews before anything publishes — her Portuguese beats any model's, and PT is the highest-value market.

- [ ] Write the translation script (EN markdown → PT/ES drafts, preserving frontmatter and markdown structure)
- [ ] Pick the model — check the current Claude API reference at build time rather than assuming
- [ ] Run it as a GitHub Action so Inés never touches a terminal
- [ ] Have the Action open a PR or commit as **draft**, never publish directly
- [ ] Confirm translated drafts land in the CMS editor for review
- [ ] Add a brief glossary of brand terms that must not be translated ("I.S Makeup", service names)

---

## Phase 6 — Deploy & SEO launch

- [ ] Connect the repo to Cloudflare Pages with the Astro build preset
- [ ] Verify preview deployments work on PRs
- [ ] Point `ismakeup.pt` DNS at Cloudflare Pages
- [ ] Confirm HTTPS, `www` → apex redirect, and the trailing-slash convention
- [ ] Add security headers via `_headers`
- [ ] Set up Google Search Console; submit the sitemap; verify all three languages are indexed
- [ ] Confirm hreflang is error-free in Search Console
- [ ] Set up Google Business Profile properly — photos, service areas, reviews. Highest-ROI item on this entire list
- [ ] Publish 2–3 launch posts
- [ ] Add analytics (Cloudflare Web Analytics — free, no cookie banner needed)

---

## Phase 7 — Handoff

- [ ] 30-minute session with Inés: log in, write a post, add images, publish
- [ ] Confirm 2FA is working on her phone before she needs it
- [ ] Bookmark `ismakeup.pt/admin` on her devices
- [ ] Write a one-page guide in Portuguese covering publish, edit, unpublish
- [ ] Agree a realistic cadence — one solid post a month beats four then silence
- [ ] Schedule a 30-day check-in to see what's actually being used

---

## Open questions

- **Where does media live?** `assets/` is untracked and history has been purged clean (repo is 460K). Cloudflare Pages builds from the repo, so nothing in `assets/` will deploy as things stand. The images are only ~1.6MB total once optimized — small enough to track in git without concern. The 47MB is almost entirely the four videos. Likely answer: optimized images in git, video on YouTube or R2.
- Who owns `ismakeup.pt`, and is it registered yet?
- Is `tweaks-panel.jsx` intentionally deleted?
- Does the schema's placeholder phone number (`+351900000000`) need replacing before launch? Marked with a TODO in `src/data/site.ts`.
- Restyle during the Astro port, or strictly port-then-restyle? — resolved: ported first, `styles.css` untouched.
- ~~The old hand-written schema drifted from the visible FAQ.~~ Resolved: schema is now generated from the visible FAQ, and the keyword-rich phrasing the old JSON-LD carried was moved onto the page (EN only — PT never drifted, ES differed only in punctuation).
