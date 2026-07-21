import { visit, SKIP } from 'unist-util-visit';

// Images placed one after another become a grid instead of a tall stack.
//
// Deliberately syntax-free: Inés drops two or three photos in a row in the
// rich text editor and gets a collage. Anything she had to type — a directive,
// a shortcode — would show up as raw text in the WYSIWYG, which is the thing
// the whole content design avoids. A paragraph between two images keeps them
// apart, which is what someone would expect without being told.
//
// Runs after rehype-markdown-figure, which is what produces the figures.

const isWhitespace = (node) => node.type === 'text' && node.value.trim() === '';

const hasClass = (node, name) =>
  node.type === 'element' && node.properties?.className?.includes(name);

const isFigure = (node) => node.tagName === 'figure' && hasClass(node, 'post-figure');
const isGallery = (node) => node.tagName === 'div' && hasClass(node, 'post-gallery');

// Four reads better as a 2×2 block than as four slivers, and beyond four a
// third column keeps each photo big enough to be worth looking at.
const columnsFor = (count) => (count === 4 ? 2 : count >= 5 ? 3 : count);

export function rehypeGallery() {
  return (tree) => {
    visit(tree, (node) => {
      // Don't descend into a gallery this pass just created, or its figures
      // would be gathered up and wrapped a second time.
      if (isGallery(node)) return SKIP;
      if (!node.children || node.children.length < 2) return;

      const result = [];
      let run = [];

      const flush = () => {
        if (run.length >= 2) {
          result.push({
            type: 'element',
            tagName: 'div',
            properties: {
              className: ['post-gallery'],
              style: `--gallery-columns:${columnsFor(run.length)}`,
            },
            children: run,
          });
        } else {
          result.push(...run);
        }
        run = [];
      };

      for (const child of node.children) {
        if (isFigure(child)) {
          run.push(child);
          continue;
        }
        // Whitespace between two figures shouldn't break the run — markdown
        // puts a blank line between block elements.
        if (isWhitespace(child) && run.length > 0) continue;

        flush();
        result.push(child);
      }
      flush();

      node.children = result;
    });
  };
}
