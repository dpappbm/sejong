export const escapeHtml = (text: unknown) => String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const stripTags = (html: unknown) => String(html).replace(/<[^>]+>/g, '');

/** Plain text of an HTML fragment, safe inside a double-quoted attribute. */
export const attributeText = (html: unknown) => escapeHtml(stripTags(html)).replace(/"/g, '&quot;');

export const koreanSpan = (korean: string) => `<span class="korean">${korean}</span>`;

/** A Hungarian translation line under a Korean form. */
export const translationLine = (hungarian: string) => `<span class="translation">${escapeHtml(hungarian)}</span>`;

/** The tag shown on own content (beyond the textbook). */
export const ownTag = (label = '＋ Saját') => `<span class="tag own">${label}</span>`;

export const disclosureArrow = '<span class="disclosure-arrow" aria-hidden="true"></span>';

export function correctIncorrectList(items: [number, string, string?][] | undefined): string {
  if (!items) return '';
  const rows = items.map(([isCorrect, korean, hungarian]) =>
    `<li class="${isCorrect ? 'correct' : 'incorrect'}">${koreanSpan(korean)}${hungarian ? ` <span class="hungarian">${hungarian}</span>` : ''}</li>`);
  return `<ul class="correct-incorrect">${rows.join('')}</ul>`;
}
