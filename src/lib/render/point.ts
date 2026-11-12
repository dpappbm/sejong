// One grammar point card: explanation, conjugation table, examples, honorific section, own note, group boxes.
import type { Honorific } from '../../data/types';
import type { PointInfo } from '../content';
import { relatedPlaceholder } from '../crossReferences';
import { escapeHtml, ownTag } from '../html';
import { reportProblem } from '../problems';
import { checkCustomTableTranslations } from '../translations';
import { checkCorrectIncorrect, correctIncorrectList } from './correctIncorrect';
import { forwardMark } from './forwardReferences';
import { groupBoxesFor } from './groups';
import { renderConjugationTable } from './table';

/** "Tiszteleti alak": only where the honorific is a distinct form (께, 계시다, 드리다 …). */
function renderHonorificSection(honorific: Honorific | undefined, key: string): string {
  if (!honorific) return '';
  for (const row of honorific.rows ?? []) {
    if (row.length < 4 || row.some(cell => !cell)) reportProblem(`${key}: incomplete honorific table row: ${row.join(' | ')}`);
  }
  if (!honorific.examples || honorific.examples.length < 2) reportProblem(`${key}: honorific section with fewer than 2 examples`);
  for (const [korean, hungarian] of honorific.examples ?? []) if (!hungarian) reportProblem(`${key}: honorific example without translation: ${korean}`);
  checkCorrectIncorrect(`${key} honorific`, honorific.correctIncorrect);
  const koreanWithTranslation = (korean: string, hungarian: string) => `<span class="korean">${korean}</span><span class="translation">${escapeHtml(hungarian)}</span>`;
  const table = honorific.rows?.length
    ? `<div class="table-wrapper"><table class="conjugation-table honorific-table"><thead><tr><th>Alap</th><th aria-hidden="true"></th><th>Tiszteleti</th></tr></thead><tbody>${honorific.rows.map(([baseKorean, baseHungarian, honorificKorean, honorificHungarian]) =>
      `<tr><td>${koreanWithTranslation(baseKorean, baseHungarian)}</td><td class="arrow" aria-hidden="true">→</td><td>${koreanWithTranslation(honorificKorean, honorificHungarian)}</td></tr>`).join('')}</tbody></table></div>`
    : '';
  const examples = (honorific.examples ?? []).map(([korean, hungarian, note]) =>
    `<li><span class="korean">${korean}</span><span class="hungarian">${hungarian}</span>${note ? `<span class="irregular-note">${note}</span>` : ''}</li>`).join('');
  return `<section class="honorific"><h5>Tiszteleti alak ${ownTag()}</h5>${table}${honorific.note ?? ''}${examples ? `<ul class="examples">${examples}</ul>` : ''}${correctIncorrectList(honorific.correctIncorrect)}</section>`;
}

function checkPoint(point: PointInfo): void {
  const where = `${point.book} lesson ${point.lesson} point ${point.point}`;
  if (!point.explanation) reportProblem(`${where}: no explanation`);
  if (!point.studentBookPage || !point.vocabularyGrammarPage) reportProblem(`${where}: no source page`);
  if (!point.examples || point.examples.length < 3) reportProblem(`${where}: fewer than 3 examples`);
  if (point.examples?.some(example => !example[1])) reportProblem(`${where}: example without translation`);
  checkCorrectIncorrect(where, point.correctIncorrect);
  if (point.conjugable !== false && point.table && point.table.kind !== 'noun' && point.table.irregular === false && !point.irregularRowsOptional) {
    reportProblem(`${where}: conjugable but no irregular rows`);
  }
}

export function renderPoint(point: PointInfo): string {
  checkPoint(point);
  const key = `${point.book}-${point.lesson}-${point.point}`;
  checkCustomTableTranslations(key, point.customHtml);
  const tags = [
    `<span class="tag textbook">Tankönyv</span>`,
    `<span class="tag future-tag progress-tag">még nem vettük</span>`, // visible only when a progress is set (browser script)
  ].join('');
  const examples = (point.examples ?? []).map(([korean, hungarian, note]) =>
    `<li><span class="korean">${korean}</span><span class="hungarian">${hungarian}${forwardMark(point.id, korean)}</span>${note ? `<span class="irregular-note">${note}</span>` : ''}</li>`).join('');
  return `
<article class="grammar-point" id="${point.id}" data-book="${point.book}" data-lesson="${point.lesson}">
  <header class="grammar-point-header">
    <div class="grammar-point-number">${point.book} · ${point.lesson}. lecke · ${point.point}. nyelvtan</div>
    <h4><span class="korean form">${point.form}</span><span class="grammar-point-name">${point.name}</span></h4>
    <div class="grammar-point-meta">${tags}<span class="source-reference">SB ${point.studentBookPage}. o. · VG ${point.vocabularyGrammarPage}. o.</span></div>
  </header>
  <div class="grammar-point-body">
    <div class="explanation">${point.explanation}</div>
    ${point.customHtml ?? ''}
    ${point.table ? `<h5>Képzés</h5>${renderConjugationTable(point.table, key)}` : ''}
    ${examples ? `<h5>Példák</h5><ul class="examples">${examples}</ul>` : ''}
    ${correctIncorrectList(point.correctIncorrect)}
    ${renderHonorificSection(point.honorific, key)}
    ${point.ownNote ? `<aside class="own"><div class="own-heading">${ownTag('＋ Saját kiegészítés')}</div>${point.ownNote}</aside>` : ''}
    ${groupBoxesFor(point.id)}
    ${relatedPlaceholder(point.id)}
  </div>
</article>`;
}
