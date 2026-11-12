// The ✅/❌ usage samples of grammar points, honorific sections, related-structure boxes and honorific word categories.
import type { CorrectIncorrect } from '../../data/types';
import { koreanSpan } from '../html';
import { reportProblem } from '../problems';

/** Every correct sample needs a translation, every incorrect one a reason. */
export function checkCorrectIncorrect(where: string, items: CorrectIncorrect[] | undefined): void {
  for (const item of items ?? []) {
    if ('correct' in item) {
      if (!item.translation.trim()) reportProblem(`${where}: correct sample without translation: ${item.correct}`);
    } else if (!item.reason.trim()) reportProblem(`${where}: incorrect sample without reason: ${item.incorrect}`);
  }
}

export function correctIncorrectList(items: CorrectIncorrect[] | undefined): string {
  if (!items?.length) return '';
  // Everything goes under the Korean sentence: translation, then the reason (❌) or the note (✅).
  const line = (className: string, text: string | undefined) => text ? `<span class="${className}">${text}</span>` : '';
  const rows = items.map(item => 'correct' in item
    ? `<li class="correct">${koreanSpan(item.correct)}${line('hungarian', item.translation)}${line('correct-incorrect-note', item.note)}</li>`
    : `<li class="incorrect">${koreanSpan(item.incorrect)}${line('hungarian', item.translation)}${line('correct-incorrect-reason', item.reason)}</li>`);
  return `<ul class="correct-incorrect">${rows.join('')}</ul>`;
}
