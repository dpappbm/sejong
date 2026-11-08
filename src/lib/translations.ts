// Hungarian lines of the conjugation tables: a column pattern such as 'nem {presentFirstSingular}'
// is filled with the word's Hungarian forms from the lexicon.
import { nouns, words } from '../data/lexicon';
import type { ColumnTranslation, LexiconEntry } from '../data/types';
import { koreanSpan, translationLine } from './html';
import { reportProblem } from './problems';

export const lexiconEntry = (dictionaryForm: string): LexiconEntry | undefined => words[dictionaryForm] ?? nouns[dictionaryForm];

const NEGATIVE_PATTERN = /(^|[\s(])(nem|ne) \{/;

export function fillHungarianPattern(pattern: string, entry: LexiconEntry, where: string): string {
  if (entry.wordClass === 'verb') {
    if (entry.hasPreverb && NEGATIVE_PATTERN.test(pattern)) reportProblem(`${where}: verb with preverb in a negative pattern: ${pattern}`);
    if (entry.hasNegativeMeaning && NEGATIVE_PATTERN.test(pattern)) reportProblem(`${where}: verb with negative meaning in a negative pattern: ${pattern}`);
  }
  // Computed placeholders: "evés után (= miután ettem)" when the verb has a natural time noun.
  const values: Record<string, unknown> = { ...entry };
  if (entry.wordClass === 'verb') {
    values.afterClause = entry.timeNoun ? `${entry.timeNoun} után (= miután ${entry.pastFirstSingular})` : `miután ${entry.pastFirstSingular}`;
    values.beforeClause = entry.timeNoun ? `${entry.timeNoun} előtt (= mielőtt ${entry.presentFirstSingular})` : `mielőtt ${entry.presentFirstSingular}`;
  }
  const filled = pattern.replace(/\{(\w+)\}/g, (match, key: string) => (values[key] != null ? String(values[key]) : match));
  if (/\{\w+\}/.test(filled)) reportProblem(`${where}: unfilled placeholder: ${filled}`);
  return filled;
}

export function wordGloss(dictionaryForm: string, where: string): string {
  const entry = lexiconEntry(dictionaryForm);
  if (!entry) {
    reportProblem(`${where}: missing from the lexicon: ${dictionaryForm}`);
    return '';
  }
  return translationLine(entry.hungarian);
}

/** One table cell: the Korean form and its Hungarian line. */
export function translatedCell(korean: string | null | undefined, dictionaryForm: string, translation: ColumnTranslation | null | undefined, where: string): string {
  if (korean == null) return '<span class="not-applicable">—</span>';
  const entry = lexiconEntry(dictionaryForm);
  const pattern = translation?.[entry ? entry.wordClass : 'verb'];
  if (!entry || !pattern) {
    reportProblem(`${where}: no translation (${dictionaryForm} → ${korean})`);
    return koreanSpan(korean);
  }
  return koreanSpan(korean) + translationLine(fillHungarianPattern(pattern, entry, where));
}

/**
 * Hand-written tables: every Korean cell needs a Hungarian line. Exceptions: an ending starting with '-',
 * and cells marked <span class="korean glossed-in-row"> whose meaning stands in a Hungarian column of the row.
 */
export function checkCustomTableTranslations(key: string, html: string | undefined): void {
  if (!html) return;
  for (const cell of html.matchAll(/<td>([\s\S]*?)<\/td>/g)) {
    for (const korean of cell[1].matchAll(/<span class="korean">([\s\S]*?)<\/span>(<span class="translation">)?/g)) {
      const text = korean[1].replace(/<[^>]+>/g, '').trim();
      if (!korean[2] && !text.startsWith('-')) reportProblem(`${key}: hand-written table without translation: ${text}`);
    }
  }
}
