// The collapsed "Szókincs" bar at the end of a lesson (after the pronunciation box).
import entries from '../../data/vocabulary';
import type { KoreanHungarian } from '../../data/types';
import { BOOK_DATA, type BookCode } from '../content';
import { disclosureArrow, escapeHtml, ownTag } from '../html';
import { reportProblem } from '../problems';
import { forwardMark } from './forwardReferences';

const PARTS = ['textbook', 'own'] as const;

export function checkVocabulary(): void {
  for (const [key, lessonVocabulary] of Object.entries(entries)) {
    const match = /^([1-4][AB])-(\d+)$/.exec(key);
    if (!match || !BOOK_DATA[match[1] as BookCode]?.points.some(point => point.lesson === Number(match[2]))) {
      reportProblem(`vocabulary ${key}: no such lesson`);
      continue;
    }
    for (const part of Object.keys(lessonVocabulary)) if (!(PARTS as readonly string[]).includes(part)) reportProblem(`vocabulary ${key}: unknown part: ${part}`);
    const rows = PARTS.flatMap(part => lessonVocabulary[part] ?? []);
    if (!rows.length) reportProblem(`vocabulary ${key}: empty`);
    const seen = new Set<string>();
    rows.forEach((row, index) => {
      if (!Array.isArray(row) || row.length !== 2 || !row[0] || !row[1]) reportProblem(`vocabulary ${key}: incomplete row (${index + 1}.): ${row?.[0]}`);
      else if (seen.has(row[0])) reportProblem(`vocabulary ${key}: listed twice: ${row[0]}`);
      else seen.add(row[0]);
      // Upper-case abbreviations are part of Korean words (PC방); any other Latin letter means a swapped column.
      if (row?.[0] && /[A-Za-z]/.test(row[0].replace(/\([^)]*\)/g, '').replace(/[A-Z]{2,}/g, ''))) reportProblem(`vocabulary ${key}: Latin letter in the Korean column: ${row[0]}`);
    });
  }
}

export function vocabularyBox(book: string, lesson: number): string {
  const lessonVocabulary = entries[`${book}-${lesson}`];
  if (!lessonVocabulary) return '';
  const count = PARTS.reduce((sum, part) => sum + (lessonVocabulary[part] ?? []).length, 0);
  const table = (rows: KoreanHungarian[]) => `<div class="table-wrapper"><table class="plain vocabulary-table"><thead><tr><th>Koreai</th><th>Magyarul</th></tr></thead><tbody>` +
    rows.map(([korean, hungarian]) => `<tr class="vocabulary-row"><td class="korean">${escapeHtml(korean)}</td><td>${escapeHtml(hungarian)}${forwardMark(`vocabulary ${book}-${lesson}`, korean)}</td></tr>`).join('') + `</tbody></table></div>`;
  const { textbook, own } = lessonVocabulary;
  return `<details class="vocabulary"><summary>${disclosureArrow}<b>Szókincs</b><span class="count">${count} szó</span></summary><div class="vocabulary-body">` +
    (textbook?.length ? `<div class="vocabulary-part"><div class="vocabulary-heading">Tankönyv</div>${table(textbook)}</div>` : '') +
    (own?.length ? `<aside class="own vocabulary-part vocabulary-own"><div class="own-heading">${ownTag()} <b>További szavak</b></div>${table(own)}</aside>` : '') +
    `</div></details>`;
}
