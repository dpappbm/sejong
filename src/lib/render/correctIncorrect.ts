// The ✅/❌ usage samples of grammar points, honorific sections, related-structure boxes and honorific word categories.
import type { CorrectIncorrect } from '../../data/types';
import { koreanSpan } from '../html';
import { soundButton } from '../sound';

/** With a book, the correct samples get a play button (the incorrect ones never do). */
export function correctIncorrectList(items: CorrectIncorrect[] | undefined, book?: string): string {
  if (!items?.length) return '';
  // Everything goes under the Korean sentence: translation, then the reason (❌) or the note (✅).
  const line = (className: string, text: string | undefined) =>
    text ? `<span class="${className}">${text}</span>` : '';
  const rows = items.map(item =>
    'correct' in item
      ? `<li class="correct">${koreanSpan(item.correct + soundButton(item.correct, book))}${line('hungarian', item.translation)}${line('correct-incorrect-note', item.note)}</li>`
      : `<li class="incorrect">${koreanSpan(item.incorrect)}${line('hungarian', item.translation)}${line('correct-incorrect-note', item.reason)}</li>`
  );
  return `<ul class="correct-incorrect">${rows.join('')}</ul>`;
}
