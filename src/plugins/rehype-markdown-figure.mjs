import { visit, SKIP } from 'unist-util-visit';

// Markdown renders a lone image as <p><img></p>, which leaves no way to let a
// photo sit wider than the text column or to carry a caption. Promoting it to
// a <figure> gives the prose grid something to work with, and the markdown
// title — ![alt](photo.jpg "Caption") — becomes the caption.

const isWhitespace = (node) => node.type === 'text' && node.value.trim() === '';
const isImage = (node) => node.type === 'element' && node.tagName === 'img';

export function rehypeMarkdownFigure() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'p' || !parent || index === null) return;

      const children = node.children.filter((child) => !isWhitespace(child));
      if (children.length !== 1 || !isImage(children[0])) return;

      const img = children[0];
      const caption = img.properties?.title;

      const figure = {
        type: 'element',
        tagName: 'figure',
        properties: { className: ['post-figure'] },
        children: [img],
      };

      if (caption) {
        delete img.properties.title;
        figure.children.push({
          type: 'element',
          tagName: 'figcaption',
          properties: {},
          children: [{ type: 'text', value: String(caption) }],
        });
      }

      parent.children[index] = figure;
      return [SKIP, index + 1];
    });
  };
}
