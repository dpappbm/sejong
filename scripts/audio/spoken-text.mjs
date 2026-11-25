// The text the voice reads for a Korean text of the site, and the name of its sound file.
import { createHash } from 'node:crypto';

/** The text with single spaces. */
export const oneLine = text => text.replace(/\s+/g, ' ').trim();

/**
 * The text to read. `spokenForms` (from overrides.json) gives the form of texts no rule can settle: numbers, Latin
 * letters and parentheses, which are sometimes read and sometimes not, and alternatives inside a phrase. Throws if
 * anything unreadable is left.
 */
export function spokenText(rawText, spokenForms = {}) {
  const text = oneLine(rawText);
  // 놓고/두고 오다 and 다치다/부상을 당하다 look alike, but share different parts
  const isAmbiguous = text.includes(' ') && /[^ ][/][^ ]/.test(text) && !spokenForms[text];
  const spoken =
    spokenForms[text] ??
    text
      .replace(/(^|\s)[가나다]:\s*/g, '$1') // speakers of a dialogue
      .replace(/\s*–\s*/g, ' ') // answer after a dash
      .replace(/[〈〉《》“”‘’"']/g, '')
      .replace(/…\.?$/, '.')
      .replace(/\s*\/\s*/g, ', ') // alternatives, with a short pause
      .replace(/\s+/g, ' ')
      .trim();

  if (isAmbiguous || !/^[가-힣 .,?!]+$/.test(spoken) || !/[가-힣]/.test(spoken))
    throw new Error(`No spoken form for "${text}": add it to "spokenForms" in scripts/audio/overrides.json`);
  return spoken;
}

/** File name (without extension) of the sound of a spoken text. */
export const audioId = spoken => createHash('sha256').update(spoken, 'utf8').digest('hex').slice(0, 12);
