// The sounds of the Korean texts (build time only): which text has a sound file.
// How the files are made and stored: scripts/audio/README.md.
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import overrides from '../../scripts/audio/overrides.json';
import packList from '../../scripts/audio/packs.json';
import { audioId, spokenText } from '../../scripts/audio/spoken-text.mjs';
import { plainText, type Text } from './richText';

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
  /** Spoken text → the voices that say it wrong. */
  excluded: Record<string, string[]>;
}

/** The sound of a Korean text. */
export interface Sound {
  /** The name of the sound files. */
  id: string;
  /** The voices that say the text wrong. */
  without: string[];
}

/** The function behind soundOf(), for any set of sound files. */
export function createSoundOf({ books, voices, hasFile, spokenForms, excluded }: SoundSettings) {
  return (korean: Text, book: string | undefined): Sound | null => {
    if (!book || !books.has(book)) return null;
    let spoken: string;
    try {
      spoken = spokenText(plainText(korean), spokenForms);
    } catch {
      return null; // a text without a spoken form was never recorded
    }
    const id = audioId(spoken);
    const without = voices.filter(voice => excluded[spoken]?.includes(voice));
    if (without.length === voices.length) return null;
    if (!voices.every(voice => without.includes(voice) || hasFile(voice, id))) return null;
    return { id, without };
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

/** The sound of a Korean text of a book, or null if there is none. */
export const soundOf = createSoundOf({
  books: new Set(packList.packs.map(pack => pack.book)),
  voices: VOICES.map(voice => voice.id),
  hasFile: (voice, id) => files.get(voice)!.has(id),
  spokenForms: overrides.spokenForms,
  excluded: overrides.excluded,
});
