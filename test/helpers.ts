// Checks shared by the content tests. Each returns the list of problems; the tests expect an empty list.
import type { CorrectIncorrect, Example } from '../src/data/types';
import { exampleParts, plainText, type Content, type Text, type TextElement } from '../src/lib/richText';

const isEmpty = (text: Text | undefined) => !text || !plainText(text).trim();

export const incompleteExamples = (where: string, examples: Example[] = []): string[] =>
  examples
    .map(exampleParts)
    .filter(({ korean, hungarian }) => isEmpty(korean) || isEmpty(hungarian))
    .map(({ korean }) => `${where}: example without Korean or translation: ${plainText(korean)}`);

/** Every correct sample (and correction) needs a translation, every incorrect one a reason. */
export const incompleteSamples = (where: string, items: CorrectIncorrect[] = []): string[] =>
  items
    .filter(item =>
      'correct' in item
        ? isEmpty(item.correct) || isEmpty(item.translation)
        : isEmpty(item.incorrect) ||
          isEmpty(item.reason) ||
          (item.correction !== undefined && (isEmpty(item.correction.correct) || isEmpty(item.correction.translation)))
    )
    .map(item => `${where}: incomplete sample: ${plainText('correct' in item ? item.correct : item.incorrect)}`);

/** The text as a flat list of strings and elements. */
export const partsOf = (text: Text): (string | TextElement)[] =>
  typeof text === 'string' || 'kind' in text ? [text] : text.flatMap(partsOf);

/**
 * The Korean forms in the table cells of a content that have no Hungarian line after them. Exceptions: an ending
 * starting with "-", and koreanGlossedInRow(), whose meaning stands in a Hungarian column of the row.
 */
export const untranslatedKorean = (where: string, content: Content): string[] =>
  content
    .flatMap(block => (block.kind === 'table' ? block.rows.flat() : []))
    .flatMap(cell => {
      const parts = partsOf(cell);
      return parts.flatMap((part, index) => {
        if (typeof part === 'string' || part.kind !== 'korean' || part.glossedInRow) return [];
        const next = parts[index + 1];
        const isTranslated = typeof next === 'object' && next.kind === 'translation' && !isEmpty(next.content);
        const korean = plainText(part).trim();
        return isTranslated || korean.startsWith('-') ? [] : [`${where}: without translation: ${korean}`];
      });
    });

const LESSON_MENTION = /[1-4][AB] \d{1,2}\.((,? és \d{1,2}\.)*) leck|Alapszabályok \d\./;

/** "3A 9. lecke" or "Alapszabályok 2." written into a text instead of reference(). */
export const unlinkedMentions = (where: string, texts: Text[]): string[] =>
  texts
    .map(text =>
      partsOf(text)
        .map(part => (typeof part === 'object' && part.kind === 'reference' ? '' : plainText(part)))
        .join('')
    )
    .filter(text => LESSON_MENTION.test(text))
    .map(text => `${where}: ${text}`);
