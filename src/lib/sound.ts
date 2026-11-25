// The play buttons of the Korean texts (build time only): which text has a sound file, and the HTML of its button.
// How the files are made and stored: scripts/audio/README.md.
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import overrides from '../../scripts/audio/overrides.json';
import packList from '../../scripts/audio/packs.json';
import { audioId, spokenText } from '../../scripts/audio/spoken-text.mjs';
import { attributeText } from './html';

/** The voices in the order of the menu. All of them are machine voices. */
export const VOICES = [
  { id: 'F1', label: 'Női 1' },
  { id: 'F5', label: 'Női 2' },
  { id: 'M2', label: 'Férfi 1' },
  { id: 'M4', label: 'Férfi 2' },
];

interface SoundSettings {
  /** The books that have sound files for all their texts. */
  books: ReadonlySet<string>;
  voices: readonly string[];
  hasFile: (voice: string, id: string) => boolean;
  spokenForms: Record<string, string>;
}

/** The function behind soundButton(), for any set of sound files. */
export function createSoundButton({ books, voices, hasFile, spokenForms }: SoundSettings) {
  return (korean: string, book: string | undefined): string => {
    if (!book || !books.has(book)) return '';
    let spoken: string;
    try {
      spoken = spokenText(korean, spokenForms);
    } catch {
      return ''; // a text without a spoken form was never recorded
    }
    const id = audioId(spoken);
    if (!voices.every(voice => hasFile(voice, id))) return '';
    const label = `Meghallgatás: ${attributeText(korean)}`;
    // No text inside: the button must not become part of the Korean text (links, copying).
    return `<button class="sound-button" type="button" data-sound="${id}" aria-label="${label}" title="Meghallgatás (gépi hang)"></button>`;
  };
}

/** The ids of the sound files of each voice in public/audio; empty without sound files. */
export function soundFiles(): Map<string, Set<string>> {
  const files = new Map<string, Set<string>>();
  for (const { id } of VOICES) {
    try {
      files.set(id, new Set(readdirSync(join(process.cwd(), 'public/audio', id)).map(name => name.slice(0, -4))));
    } catch {
      files.set(id, new Set());
    }
  }
  return files;
}

const files = soundFiles();

/** Without sound files there is no button, voice menu or notice on the site. */
export const hasSound = [...files.values()].every(ids => ids.size > 0);

/** The play button of a Korean text of a book, or nothing if there is no sound for it. */
export const soundButton = createSoundButton({
  books: new Set(packList.packs.map(pack => pack.book)),
  voices: VOICES.map(voice => voice.id),
  hasFile: (voice, id) => files.get(voice)!.has(id),
  spokenForms: overrides.spokenForms,
});

/** Adds the buttons to the example lists (exampleList() in html.ts) of an own note. */
export const withSoundButtons = (html: string, book: string): string =>
  html.replace(/<ul class="examples">.*?<\/ul>/gs, list =>
    list.replace(
      /(<li><span class="korean">)(.*?)(<\/span><span class="hungarian">)/gs,
      (_match, start: string, korean: string, end: string) => start + korean + soundButton(korean, book) + end
    )
  );
