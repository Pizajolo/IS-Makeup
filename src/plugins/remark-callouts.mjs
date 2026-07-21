import { visit } from 'unist-util-visit';

// :::note / :::tip / :::warning containers, via remark-directive.
//
// The label is only ever what the author typed — `:::tip[Dica]` — never
// generated. That keeps callouts free of per-locale strings, and means a
// Portuguese post never sprouts an English "Tip" heading.

const TYPES = new Set(['note', 'tip', 'warning']);

export function remarkCallouts() {
  return (tree) => {
    visit(tree, (node) => {
      if (node.type !== 'containerDirective' || !TYPES.has(node.name)) return;

      const first = node.children[0];
      const hasLabel =
        first && first.type === 'paragraph' && first.data?.directiveLabel === true;

      if (hasLabel) {
        node.children.shift();
        node.children.unshift({
          type: 'paragraph',
          data: { hName: 'p', hProperties: { className: ['callout-label'] } },
          children: first.children,
        });
      }

      node.data = {
        ...node.data,
        hName: 'aside',
        hProperties: { className: ['callout', `callout-${node.name}`] },
      };
    });
  };
}
