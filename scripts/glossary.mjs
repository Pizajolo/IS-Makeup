// Terms the translator must not touch, derived from how the site's own copy
// already behaves rather than invented.
//
// Worth noting what is NOT here: service names. The implementation plan
// originally listed them as do-not-translate, but src/i18n/{pt,es}.ts translate
// them throughout ("Bridal Day-Of" → "Noiva Dia do Casamento" → "Novia Día de
// la Boda"). Freezing them would have made posts read against the site.

export const KEEP_VERBATIM = [
  // Brand and person. Note the accent on Inés — a translator that "corrects"
  // it to Ines is getting the artist's name wrong.
  'I.S Makeup',
  'Inés Santiago',

  // Borrowed into both Portuguese and Spanish already — the FAQ answers in
  // pt.ts and es.ts both say "first look", untranslated, three times each.
  // The wedding industry uses the English term in all three languages.
  'first look',

  // Handles and URLs are identifiers, not words.
  '@inessantiago_makeup',
];

// Place names DO localise — each language uses its own exonym, and getting
// this wrong is immediately obvious to a local reader.
export const PLACE_NAMES = [
  { en: 'Lisbon', pt: 'Lisboa', es: 'Lisboa' },
  { en: 'Portugal', pt: 'Portugal', es: 'Portugal' },
  { en: 'the Algarve', pt: 'o Algarve', es: 'el Algarve' },
  { en: 'Mexico', pt: 'México', es: 'México' },
  { en: 'Guadalajara', pt: 'Guadalajara', es: 'Guadalajara' },
  // Sintra, Cascais and Comporta are identical in all three.
];

/** The glossary section of the system prompt, rendered for one target locale. */
export function glossaryFor(targetLocale) {
  const places = PLACE_NAMES.map(
    (place) => `  - "${place.en}" → "${place[targetLocale]}"`,
  ).join('\n');

  return [
    'Never translate or alter these, in any position or inflection:',
    ...KEEP_VERBATIM.map((term) => `  - ${term}`),
    '',
    'Use the local form of these place names:',
    places,
  ].join('\n');
}
