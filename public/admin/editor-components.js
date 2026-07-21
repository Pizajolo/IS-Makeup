// Custom editor components for Sveltia CMS.
//
// Sveltia's rich text editor can display and edit a markdown table cell by
// cell, but has no UI to create one or to add and remove rows and columns
// (their docs list `table` as a possible future component). This fills the
// creation half of that gap.
//
// The approach is paste-from-a-spreadsheet rather than an inline grid editor:
// Inés builds the table in Google Sheets or Excel — where adding rows and
// columns is trivial and she already knows how — copies it, and pastes it
// here. Restructuring later means changing it in the spreadsheet and pasting
// again, which is why the shape being fixed afterwards matters less than it
// sounds.
//
// Deliberately INSERT-ONLY. See the `pattern` note below.

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' };
const escapeHtml = (value) => String(value).replace(/[&<>"]/g, (c) => HTML_ESCAPES[c]);

/**
 * Turns a spreadsheet paste into a rectangular grid of cells.
 * Returns null when there is nothing usable, so callers can bail cleanly.
 */
function parsePastedGrid(raw) {
  const lines = String(raw ?? '')
    .replace(/\r\n?/g, '\n')
    .split('\n')
    .filter((line) => line.trim() !== '');

  if (lines.length === 0) return null;

  // Excel and Google Sheets put tab-separated text on the clipboard. Comma and
  // run-of-spaces are fallbacks so a hand-typed table still works.
  const delimiter = lines.some((line) => line.includes('\t'))
    ? '\t'
    : lines.some((line) => line.includes(','))
      ? ','
      : /\s{2,}/;

  const rows = lines.map((line) =>
    line.split(delimiter).map((cell) =>
      cell
        .trim()
        // Spreadsheets quote any cell containing the delimiter.
        .replace(/^"([\s\S]*)"$/, '$1')
        .replace(/""/g, '"')
        // A literal pipe would otherwise end the cell early.
        .replace(/\|/g, '\\|'),
    ),
  );

  // Pad short rows so the markdown stays rectangular — a ragged table renders
  // as a broken one rather than failing loudly.
  const width = Math.max(...rows.map((row) => row.length));
  return rows.map((row) => [...row, ...Array(width - row.length).fill('')]);
}

/** An empty grid of the requested size, with the headings labelled so the
 *  structure is visible and she can see where to type. */
const blankGrid = (columns, rows) => {
  const width = Math.min(Math.max(Number(columns) || 3, 1), 12);
  const height = Math.min(Math.max(Number(rows) || 3, 1), 50);
  return [
    Array.from({ length: width }, (_, i) => `Heading ${i + 1}`),
    // A single space rather than an empty string: some markdown renderers
    // collapse a truly empty cell and the column count drifts.
    ...Array.from({ length: height }, () => Array.from({ length: width }, () => ' ')),
  ];
};

/** Paste wins when present; otherwise fall back to the chosen size. */
const gridFrom = ({ data, columns, rows }) =>
  parsePastedGrid(data) ?? blankGrid(columns, rows);

const toMarkdownTable = (grid) => {
  const [header, ...body] = grid;
  const row = (cells) => `| ${cells.join(' | ')} |`;
  return [row(header), row(header.map(() => '---')), ...body.map(row)].join('\n');
};

const toHtmlTable = (grid) => {
  const [header, ...body] = grid;
  const cells = (tag, values) =>
    `<tr>${values.map((v) => `<${tag}>${escapeHtml(v)}</${tag}>`).join('')}</tr>`;
  return (
    `<table><thead>${cells('th', header)}</thead>` +
    `<tbody>${body.map((r) => cells('td', r)).join('')}</tbody></table>`
  );
};

function register() {
  if (!window.CMS?.registerEditorComponent) return false;

  window.CMS.registerEditorComponent({
    id: 'table',
    label: 'Table',
    icon: 'table',

    // Size first, paste second. The paste box was originally the only input,
    // but pasting into it does nothing — the editor appears to swallow the
    // event before the field sees it. Numbers need no clipboard, so choosing a
    // size always works; the paste box stays as a shortcut for when it does.
    fields: [
      {
        name: 'columns',
        label: 'Columns',
        widget: 'number',
        value_type: 'int',
        default: 3,
        min: 2,
        max: 8,
      },
      {
        name: 'rows',
        label: 'Rows',
        widget: 'number',
        value_type: 'int',
        default: 3,
        min: 1,
        max: 30,
        hint: 'Not counting the heading row.',
      },
      {
        name: 'data',
        label: 'Or paste from a spreadsheet',
        widget: 'text',
        required: false,
        hint:
          'Optional. If this has anything in it, it wins and the numbers above are ignored. ' +
          'The first row becomes the headings.',
      },
    ],

    // Never matches anything, on purpose — this component inserts tables, it
    // does not own them. A pattern that matched real markdown tables would
    // claim the ones already in the posts and swap the editor's working cell
    // editing for a textarea, which would be a downgrade. Once inserted, the
    // table is a normal table the editor already knows how to edit.
    pattern: /(?!)/,
    fromBlock: () => ({}),

    toBlock: (values) => toMarkdownTable(gridFrom(values)),
    toPreview: (values) => toHtmlTable(gridFrom(values)),
  });

  return true;
}

// The bundle assigns window.CMS while it evaluates, so this normally succeeds
// on the first call. The poll is a guard in case that ever becomes async.
if (!register()) {
  const timer = setInterval(() => {
    if (register()) clearInterval(timer);
  }, 50);
  setTimeout(() => clearInterval(timer), 5000);
}
