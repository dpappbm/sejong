export const escapeHtml = (text: unknown) =>
  String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const stripTags = (html: unknown) => String(html).replace(/<[^>]+>/g, '');

/** Plain text of an HTML fragment, safe inside a double-quoted attribute. */
export const attributeText = (html: unknown) => escapeHtml(stripTags(html)).replace(/"/g, '&quot;');

export const koreanSpan = (korean: string) => `<span class="korean">${korean}</span>`;

/** A Hungarian translation line under a Korean form. */
export const translationLine = (hungarian: string) => `<span class="translation">${escapeHtml(hungarian)}</span>`;

/** The tag shown on own content (beyond the textbook). */
export const ownTag = (label = '＋ Saját') => `<span class="tag own">${label}</span>`;

export const disclosureArrow = '<span class="disclosure-arrow" aria-hidden="true"></span>';

/** One example: Korean, Hungarian, optional note line. */
type Example = [korean: string, hungarian: string, note?: string];

/** Example cards (Korean, Hungarian, optional note line) for own notes, in the layout of the "Példák" section. */
export const exampleList = (examples: Example[]) =>
  `<ul class="examples">${examples
    .map(
      ([korean, hungarian, note]) =>
        `<li>${koreanSpan(korean)}<span class="hungarian">${hungarian}</span>${note ? `<span class="irregular-note">${note}</span>` : ''}</li>`
    )
    .join('')}</ul>`;

/** Sentence pairs of two contrasted patterns, one pattern per column, the Hungarian under the Korean (for own notes). */
export const comparisonTable = (patterns: [string, string], rows: [Example, Example][]) =>
  `<div class="table-wrapper"><table class="plain comparison-table"><thead><tr>${patterns
    .map(pattern => `<th>${pattern}</th>`)
    .join('')}</tr></thead><tbody>${rows
    .map(
      row =>
        `<tr>${row
          .map(
            ([korean, hungarian, note], index) =>
              `<td data-label="${attributeText(patterns[index])}">${koreanSpan(korean)}<span class="hungarian">${hungarian}</span>${note ? `<span class="irregular-note">${note}</span>` : ''}</td>`
          )
          .join('')}</tr>`
    )
    .join('')}</tbody></table></div>`;
