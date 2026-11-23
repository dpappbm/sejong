// Checks of the vocabulary data and the registration of its forward marks.
import { VOCABULARY_SOURCES, type VocabularyRow } from '../../data/types';
import entries from '../../data/vocabulary';
import { BOOK_DATA, type BookCode } from '../content';
import { reportProblem } from '../problems';
import { forwardMark } from './forwardReferences';

const PARTS = ['textbook', 'own'] as const;

/** The components render after checkForwardReferences, so the marks of the vocabulary are matched here in advance. */
export function registerVocabularyForwardReferences(): void {
  for (const [key, vocabulary] of Object.entries(entries))
    for (const [korean] of [...(vocabulary.textbook ?? []), ...(vocabulary.own ?? [])])
      forwardMark(`vocabulary ${key}`, korean);
}

export function checkVocabulary(): void {
  for (const [key, lessonVocabulary] of Object.entries(entries)) {
    const match = /^([1-4][AB])-(\d+)$/.exec(key);
    if (!match || !BOOK_DATA[match[1] as BookCode]?.points.some(point => point.lesson === Number(match[2]))) {
      reportProblem(`vocabulary ${key}: no such lesson`);
      continue;
    }
    for (const part of Object.keys(lessonVocabulary))
      if (!(PARTS as readonly string[]).includes(part)) reportProblem(`vocabulary ${key}: unknown part: ${part}`);
    const rows: VocabularyRow[] = PARTS.flatMap(part => lessonVocabulary[part] ?? []);
    if (!rows.length) reportProblem(`vocabulary ${key}: empty`);
    const seen = new Set<string>();
    rows.forEach((row, index) => {
      if (!Array.isArray(row) || row.length < 2 || row.length > 3 || !row[0] || !row[1])
        reportProblem(`vocabulary ${key}: incomplete row (${index + 1}.): ${row?.[0]}`);
      else if (row.length === 3 && !(VOCABULARY_SOURCES as readonly string[]).includes(row[2] as string))
        reportProblem(`vocabulary ${key}: unknown source: ${row[0]}: ${row[2]}`);
      else if (seen.has(row[0])) reportProblem(`vocabulary ${key}: listed twice: ${row[0]}`);
      else seen.add(row[0]);
      // Upper-case abbreviations are part of Korean words (PC방); any other Latin letter means a swapped column.
      if (row?.[0] && /[A-Za-z]/.test(row[0].replace(/\([^)]*\)/g, '').replace(/[A-Z]{2,}/g, '')))
        reportProblem(`vocabulary ${key}: Latin letter in the Korean column: ${row[0]}`);
    });
  }
}
