import { visit } from 'unist-util-visit';

// Astro exposes anything written to file.data.astro.frontmatter as
// `remarkPluginFrontmatter` on the rendered entry, which is how the post
// template and the cards get a reading time without a frontmatter field
// Inés would have to fill in by hand.

const WORDS_PER_MINUTE = 200;

export function remarkReadingTime() {
  return (tree, file) => {
    let words = 0;

    visit(tree, (node) => {
      if (node.type === 'text' || node.type === 'inlineCode' || node.type === 'code') {
        const value = node.value?.trim();
        if (value) words += value.split(/\s+/).length;
      }
    });

    const frontmatter = file.data.astro.frontmatter;
    frontmatter.words = words;
    frontmatter.readingTime = Math.max(1, Math.round(words / WORDS_PER_MINUTE));
  };
}
