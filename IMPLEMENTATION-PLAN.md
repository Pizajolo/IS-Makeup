# I.S Makeup — Blog & CMS Implementation Plan

**Stack:** Astro · Sveltia CMS · Cloudflare Pages · YouTube (watchable video) + self-hosted compressed loops (atmosphere)

**Goal:** Inés publishes multilingual posts herself through a friendly admin UI. Everything lands in git, Cloudflare Pages rebuilds, output is static and SEO-optimal.

---

## Phase 0 — Safety & prerequisites

Nothing else starts until the current work is safe in git.

- [x] Commit the current site — `styles.css`, `script.js`, `es/`, `pt/`, `sitemap.xml`, `robots.txt` were untracked and `index.html` was modified (commit `3286e8a`)
- [x] Add `.gitignore` for macOS cruft and Astro build output
- [ ] Decide on `tweaks-panel.jsx` (currently deleted in working tree) — confirm it's intentionally gone
- [ ] **Decide where media lives** — `assets/` is untracked, so Cloudflare Pages currently has no images to deploy (see Open questions)

---

## Phase 1 — Astro foundation

Collapse three near-identical HTML files into one templated site. No blog yet.

- [ ] Scaffold Astro in the repo (keep `assets/` and `styles.css` intact)
- [ ] Configure i18n: `en` at `/`, `pt` at `/pt/`, `es` at `/es/` — match the existing URL structure exactly
- [ ] Build a shared `Layout.astro` holding the `<head>`: canonical, hreflang, OG/Twitter, geo tags, theme-color
- [ ] Port the JSON-LD `@graph` (BeautySalon, Person, areaServed) into a schema component driven by data, not copy-paste
- [ ] Move page copy into per-language content files so text lives in one place per language
- [ ] Port the six sections (hero, about, services, portfolio, process, faq) as components
- [ ] Port `script.js` behaviour
- [ ] Keep `styles.css` as-is initially — restyling and migrating at once makes failures hard to diagnose
- [ ] Wire `@astrojs/sitemap` with hreflang output; delete the hand-written `sitemap.xml`
- [ ] Verify all three languages render identically to the current files
- [ ] Run the rendered output through Google's Rich Results Test — schema must survive the port

---

## Phase 2 — Media cleanup

- [ ] Add `poster` images and `preload="none"` to decorative video
- [ ] Confirm loops use `muted loop playsinline` and carry no player chrome
- [ ] Switch images to Astro's `<Image>` for AVIF/WebP + responsive `srcset`
- [ ] Audit `behindTheScenes.jpg` (562K) and `imageBride2.jpg` (339K) — oversized for their display size

---

## Phase 3 — Content architecture

Location pages first — they're evergreen and need no publishing cadence. Blog layers on top.

- [ ] Define the blog content collection schema: `title`, `description`, `date`, `heroImage`, `heroAlt`, `youtubeUrl`, `tags`, `draft`
- [ ] Make `heroAlt` a **required** field — enforced validation, since alt text is the thing everyone skips
- [ ] Build the post template with `BlogPosting` schema (author, datePublished, image, inLanguage)
- [ ] Build the blog index with pagination
- [ ] Build the location page template
- [ ] Write location pages matching the `areaServed` already in the schema: Sintra, Cascais, Comporta, Algarve, Porto
- [ ] Add internal links from posts and location pages back to services and contact
- [ ] Add a YouTube embed component — `youtube-nocookie.com`, `rel=0`, lazy-loaded, with `VideoObject` schema
- [ ] Add RSS via `@astrojs/rss`
- [ ] Add blog and location pages to the generated sitemap
- [ ] Integrate the blog into site navigation across all three languages

---

## Phase 4 — Sveltia CMS

- [ ] Register a GitHub OAuth app for the site
- [ ] Deploy the OAuth proxy as a Cloudflare Worker
- [ ] Add `/admin` with the Sveltia config
- [ ] Configure i18n so EN/PT/ES fields appear side by side in one editor
- [ ] Enable editorial workflow (draft → review → publish) so half-finished posts can be saved
- [ ] Configure the rich text editor — Inés should never see raw markdown
- [ ] Set up live preview against the real post template
- [ ] Configure media: drag-drop image upload with a size cap, committed to a defined `assets/` path
- [ ] **Video is a YouTube URL field, not a file upload** — this is the guardrail against permanent git bloat
- [ ] Grant Inés repo access at the minimum level that works
- [ ] Test the full flow end to end as a non-admin user

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
- Does the schema's placeholder phone number (`+351900000000`) need replacing before launch?
- Restyle during the Astro port, or strictly port-then-restyle?
