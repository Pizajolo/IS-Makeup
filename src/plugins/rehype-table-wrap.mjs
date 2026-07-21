import { visit, SKIP } from 'unist-util-visit';

// Wraps every table in a horizontally scrollable container so a wide
// comparison table cannot force the whole page to scroll sideways on a phone.

export function rehypeTableWrap() {
  return (tree) => {
    visit(tree, 'element', (node, index, parent) => {
      if (node.tagName !== 'table' || !parent || index === null) return;

      parent.children[index] = {
        type: 'element',
        tagName: 'div',
        properties: { className: ['table-wrap'] },
        children: [node],
      };

      // Skip past the wrapper, or the visitor walks straight back into the
      // table it just wrapped.
      return [SKIP, index + 1];
    });
  };
}
