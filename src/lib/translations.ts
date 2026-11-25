// Hungarian lines of the conjugation tables: a column pattern such as 'nem {presentFirstSingular}'
// is filled with the word's Hungarian forms from the lexicon.
import { nouns, words } from '../data/lexicon';
import type { ColumnTranslation, LexiconEntry } from '../data/types';

export const lexiconEntry = (dictionaryForm: string): LexiconEntry | undefined =>
  words[dictionaryForm] ?? nouns[dictionaryForm];

export function fillHungarianPattern(pattern: string, entry: LexiconEntry): string {
  // Computed placeholders: "evés után (= miután ettem)" when the verb has a natural time noun.
  const values: Record<string, unknown> = { ...entry };
  if (entry.wordClass === 'verb') {
    values.afterClause = entry.timeNoun
      ? `${entry.timeNoun} után (= miután ${entry.pastFirstSingular})`
      : `miután ${entry.pastFirstSingular}`;
    values.beforeClause = entry.timeNoun
      ? `${entry.timeNoun} előtt (= mielőtt ${entry.presentFirstSingular})`
      : `mielőtt ${entry.presentFirstSingular}`;
  }
  return pattern.replace(/\{(\w+)\}/g, (match, key: string) => (values[key] != null ? String(values[key]) : match));
}

/** The Hungarian line of a table cell; undefined if the lexicon or the column has nothing for the word. */
export function cellTranslation(
  dictionaryForm: string,
  translation: ColumnTranslation | null | undefined
): string | undefined {
  const entry = lexiconEntry(dictionaryForm);
  const pattern = entry && translation?.[entry.wordClass];
  return entry && pattern ? fillHungarianPattern(pattern, entry) : undefined;
}
