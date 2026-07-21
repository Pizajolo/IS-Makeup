# CMS setup — one-time steps

The CMS itself is already in the repo: [`public/admin/`](public/admin/). What's
left needs your GitHub and Cloudflare accounts, so it can't be done from here.

Roughly 20 minutes end to end.

---

## 0. Test it first, without any of this

Sveltia can sign in with a GitHub personal access token, which skips the OAuth
app and the Worker entirely. Do this before the rest — if something in the
config is wrong, you want to find out now rather than after wiring up auth.

1. GitHub → **Settings** → **Developer settings** → **Personal access tokens** →
   **Fine-grained tokens** → **Generate new token**
2. Repository access: only `Pizajolo/IS-Makeup`
3. Permissions: **Contents** → *Read and write*
4. Visit `https://is-makeup.pages.dev/admin/` and choose **Sign In with Token**

You should see the Journal collection with the two seed posts, each switchable
between EN / PT / ES.

**Check these three things specifically** — they're the parts I couldn't verify
without a live login:

- Open a post, switch to Portuguese, confirm the title and body change and the
  cover photo stays. That's `i18n: duplicate` vs `true` behaving correctly.
- Drag an image into the body. Confirm the committed file lands in
  `src/assets/blog/` and the markdown reference reads `../../../assets/blog/…`.
  This is the one config detail I'd most expect to need adjusting — relative
  `media_folder` resolution is subtle, and getting it wrong means body images
  stop being optimised.
- Make a table in the rich text editor. If the toolbar has no table button,
  she'd have to use the raw-markdown toggle, which defeats the point — tell me
  and I'll look at alternatives.

Revoke the token afterwards if you like; it isn't needed once OAuth works.

---

## 1. Register the GitHub OAuth app

GitHub → **Settings** → **Developer settings** → **OAuth Apps** → **New OAuth App**

| Field | Value |
|---|---|
| Application name | `I.S Makeup CMS` |
| Homepage URL | `https://ismakeup.pt` |
| Authorization callback URL | `https://ismakeup-cms-auth.<your-subdomain>.workers.dev/callback` |

You won't know the Worker URL until step 2, so put a placeholder in and come
back to correct it. The callback URL must match exactly, including `/callback`.

Generate a client secret. Keep the **Client ID** and **Client Secret** — the
secret is shown once.

---

## 2. Deploy the OAuth Worker

The Worker is Sveltia's official one; it exists so the client secret never
touches the browser.

```sh
git clone https://github.com/sveltia/sveltia-cms-auth.git
cd sveltia-cms-auth
npx wrangler deploy
```

Then in the Cloudflare dashboard → **Workers & Pages** → your worker →
**Settings** → **Variables and Secrets**, add:

| Name | Type | Value |
|---|---|---|
| `GITHUB_CLIENT_ID` | Secret | from step 1 |
| `GITHUB_CLIENT_SECRET` | Secret | from step 1 |
| `ALLOWED_DOMAINS` | Plaintext | `ismakeup.pt,is-makeup.pages.dev` |

`ALLOWED_DOMAINS` matters — without it, anyone could point their own CMS at your
Worker and borrow your OAuth app.

Go back to the GitHub OAuth app and fix the callback URL to the real Worker
domain.

---

## 3. Point the CMS at the Worker

In [`public/admin/config.yml`](public/admin/config.yml), replace the placeholder:

```yaml
backend:
  base_url: https://REPLACE-ME.workers.dev
```

with your Worker's URL — origin only, no `/callback`. Commit and push; Cloudflare
rebuilds and `/admin/` gets a **Sign in with GitHub** button.

---

## 4. Give Inés access

Repo → **Settings** → **Collaborators** → **Add people** → her GitHub account,
role **Write**.

Write is the minimum that works: Sveltia commits to `main` on her behalf, and
that needs push access. There's no read-only version of publishing.

If that's more than you want to hand over, the alternative is moving the repo
into a GitHub organisation and giving her Write on this repo alone — worth doing
if the account ever holds anything else.

Ask her to enable 2FA before she needs it, not during the handoff session.

---

## 5. What she'll see

- `ismakeup.pt/admin/` → **Sign in with GitHub**
- **Journal** → **New Post**
- Writes in English, switches to Portuguese and Spanish with the locale switcher
  top right
- **Draft** is on by default. It stays on until she deliberately turns it off,
  so nothing goes live by accident
- **Save** commits to `main`; Cloudflare rebuilds in about a minute

Drafts are committed but excluded from the production build, so a half-written
post is safe to leave — it just won't appear on the site.

---

## Known gaps

**No review step.** Sveltia hasn't implemented editorial workflow yet (planned
before their 1.0). Her saves land on `main` directly. The `draft` flag covers
"save unfinished work"; it does not give you an approval gate. If you later want
one, Sveltia shipping the feature would be a one-line config change.

**No preview pane.** Deliberate — see the note in `config.yml`. A preview would
have to be a second copy of the Astro post template and would drift from the
real one. She checks her work on the deployed site instead.

**A pasted YouTube link stays a link in the editor.** It becomes a real embed
only on the built page. Worth demonstrating once during the Phase 7 handoff so
it doesn't look broken to her.

**`:::note` callouts are markdown-only.** They'll show as literal `:::note` text
in the rich text editor. They exist for you, not for her — best not to mention
them in the handoff.
