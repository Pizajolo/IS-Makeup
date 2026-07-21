# Translation setup

Translations are drafts. The workflow commits them to `main` with `draft: true`,
which the build excludes — a machine translation is invisible to visitors until
a human opens it in the CMS, reads it, and turns the toggle off.

---

## One-time setup

### 1. Create an API key with a spend limit

[Anthropic Console](https://console.anthropic.com) → **Settings** → **Workspaces**
→ create a workspace (`I.S Makeup`) → set a **monthly spend limit**.

A cap of **$5/month** is more than generous: a 1,500-word post costs about
**$0.07 per language**, so the realistic spend is a couple of dollars a *year*.
The limit exists so a bug or a runaway loop can't produce a surprise invoice.

Then create an API key inside that workspace. Keys are shown once.

### 2. Store it in a GitHub Environment

Repo → **Settings** → **Environments** → **New environment** → name it exactly
`translation` (the workflow references it by name).
Inside that environment → **Add environment secret**:

| Name | Value |
|---|---|
| `ANTHROPIC_API_KEY` | the key from step 1 |

An *environment* secret rather than a repository secret: only the translation
workflow can read it, so a future workflow can't pick it up by accident.

Leave **required reviewers** off — you trust Inés, and the draft flag already
prevents anything reaching the site unreviewed.

> **Check the repo is private.** Environment secrets are never exposed to forked
> PRs, but a public repo means anyone can read the post content and workflow
> definitions. I couldn't verify this from here — worth confirming.

### 3. Done

There is nothing to install. The workflow runs `npm ci` on GitHub's runners.

---

## How Inés uses it

1. Write a post in the CMS, in whichever language is most natural, and save it
   (leaving Draft on is fine)
2. GitHub → **Actions** → **Translate a post** → **Run workflow**
3. Paste the post's slug — the last part of its web address
4. Tick the languages wanted
5. **Run workflow**

About a minute later the drafts are committed. She opens them in the CMS,
reads them, fixes what the model got wrong, and turns Draft off to publish.

**Her review is the point.** The output is a first draft from a machine that has
never met a bride. Her Portuguese is better than the model's and her Spanish is
native — this exists to save typing, not judgement.

---

## Running it locally

```sh
export ANTHROPIC_API_KEY=sk-ant-...

# See what it would do without writing or spending much
node scripts/translate.mjs --post wedding-makeup-that-lasts-all-day --to pt,es --dry-run

# For real
node scripts/translate.mjs --post wedding-makeup-that-lasts-all-day --to pt,es
```

| Flag | |
|---|---|
| `--post` | A slug (`my-post`) or a locale-qualified path (`en/my-post`). Use the qualified form when the same slug exists in two languages. |
| `--to` | Comma-separated targets: `pt`, `es`, `en` |
| `--force` | Overwrite existing translations. Off by default — an accidental re-run can't destroy her edits. |
| `--dry-run` | Translate and report, write nothing |

The source language is inferred from where the post lives, so any language can
be the source. Inés was born in Guadalajara and lives in Lisbon; making her
write in English first would mean working in her weakest language and
translating into her strongest.

---

## What the script protects

Everything in [`scripts/glossary.mjs`](scripts/glossary.mjs) is derived from how
the site's existing copy already behaves, not invented:

- **`I.S Makeup`** and **`Inés Santiago`** are never translated or re-accented
- **`first look`** stays English — the Portuguese and Spanish FAQ answers already
  use the English term, as the wedding industry does in all three languages
- **Place names localise** (Lisbon / Lisboa), because using the wrong exonym is
  immediately obvious to a local reader

Service names are deliberately *not* protected. The implementation plan
originally said they shouldn't be translated, but the site translates them
throughout (`Bridal Day-Of` → `Noiva Dia do Casamento` → `Novia Día de la
Boda`), so freezing them would have made posts read against the site.

The prompt also pins the language *variants*: European Portuguese, not
Brazilian, and Mexican Spanish, not peninsular — matching the register the rest
of the site is written in.

Body structure is preserved explicitly: heading levels, table shape, callout
directives (`:::tip[Label]` — the label translates, the directive doesn't),
image paths, and bare YouTube URLs. Internal links get their locale prefix
rewritten, so `/#services` in an English post becomes `/pt/#services` in the
Portuguese one.

---

## Model

Pinned to **`claude-opus-4-8`** in `scripts/translate.mjs`, deliberately not
exposed as a setting. Model choice is a cost/quality tradeoff, and at these
volumes there is nothing to gain by trading quality for cost.

For the same reason the script skips the Batch API (50% cheaper, up to 24h
latency) and prompt caching — at one post a month they'd be real complexity
saving under two dollars a year.
