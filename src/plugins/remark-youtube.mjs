import { visit, SKIP } from 'unist-util-visit';

// A bare YouTube URL alone on its own line becomes an embed. Inés pastes a
// link, presses enter, and that is the whole of the syntax she has to learn.
//
// A link inside a sentence stays a link — the URL has to be the entire
// paragraph to be treated as a video.

const YOUTUBE_URL =
  /^https?:\/\/(?:www\.)?(?:youtube\.com\/(?:watch\?v=|live\/|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})(?:[?&#]\S*)?$/;

const videoIdFrom = (value) => {
  const match = value?.trim().match(YOUTUBE_URL);
  return match ? match[1] : null;
};

// GFM autolinks a bare URL into a link node whose label is the URL itself.
// A label the author typed means they meant it as a link, so leave it alone.
const soleVideoUrl = (node) => {
  if (node.type !== 'paragraph' || node.children.length !== 1) return null;

  const child = node.children[0];
  if (child.type === 'text') return videoIdFrom(child.value);
  if (child.type !== 'link') return null;

  const id = videoIdFrom(child.url);
  if (!id) return null;

  const label =
    child.children.length === 1 && child.children[0].type === 'text'
      ? child.children[0].value.trim()
      : '';

  return label === '' || label === child.url.trim() ? id : null;
};

const escapeAttr = (value) =>
  String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');

export function remarkYouTube() {
  return (tree, file) => {
    const frontmatter = file.data.astro.frontmatter;
    const ids = [];

    visit(tree, 'paragraph', (node, index, parent) => {
      const id = soleVideoUrl(node);
      if (!id || !parent || index === null) return;

      ids.push(id);

      // The iframe needs an accessible name. The post title is already in the
      // right language, so using it avoids a second copy of the locale
      // strings living inside a build plugin.
      const base = frontmatter?.title ?? 'YouTube';
      const title = ids.length > 1 ? `${base} (${ids.length})` : base;

      parent.children[index] = {
        type: 'html',
        value: [
          '<figure class="video-embed">',
          '<div class="video-frame">',
          `<iframe src="https://www.youtube-nocookie.com/embed/${id}?rel=0"`,
          ` title="${escapeAttr(title)}"`,
          ' loading="lazy"',
          ' allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"',
          ' referrerpolicy="strict-origin-when-cross-origin"',
          ' allowfullscreen></iframe>',
          '</div>',
          '</figure>',
        ].join(''),
      };

      return [SKIP, index];
    });

    // The post template turns these into VideoObject schema, where it can
    // supply the name, description and date that Google requires and a remark
    // plugin has no way to know.
    if (ids.length && frontmatter) frontmatter.youtubeIds = ids;
  };
}
