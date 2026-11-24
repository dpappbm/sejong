// Packs the sound files of one book, one archive for each voice, into scripts/audio/work/packs/ and lists them in
// packs.json. Nothing is uploaded (see publish.mjs). Usage: npm run audio:pack -- --book 3A
import { execFileSync } from 'node:child_process';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import { AUDIO_DIRECTORY, NOTICE, PACK_DIRECTORY, PACKS_FILE, packName, readJson, sha256, toJson } from './packs.mjs';
import { packTar } from './tar.mjs';

const { values: options } = parseArgs({ options: { book: { type: 'string', default: '3A' } } });
const { book } = options;
const script = name => fileURLToPath(new URL(name, import.meta.url));

// The texts as they are now, so that the file of a changed or removed text is left out.
execFileSync(process.execPath, [script('collect-texts.mjs'), '--book', book], { stdio: 'inherit' });
const texts = readJson(script(`work/texts-${book}.json`)).sort((a, b) => (a.id < b.id ? -1 : 1));
const manifest = readJson(join(AUDIO_DIRECTORY, 'manifest.json'));
const voices = Object.keys(readJson(script('profiles.json')).voices);
const notice = Buffer.from(readFileSync(script(NOTICE), 'utf8').replaceAll('\r\n', '\n'));

const soundFile = (voice, { id }) => join(AUDIO_DIRECTORY, voice, `${id}.mp3`);
const missing = voices.flatMap(voice =>
  texts
    .filter(text => manifest[voice]?.[text.id]?.text !== text.spoken || !existsSync(soundFile(voice, text)))
    .map(text => `${voice}: ${text.spoken}`)
);
if (missing.length) {
  console.error(`${missing.length} sound files are missing, run "npm run audio:generate" first:`);
  console.error(missing.slice(0, 20).join('\n'));
  process.exit(1);
}

mkdirSync(PACK_DIRECTORY, { recursive: true });
const packs = voices.map(voice => {
  // How long the generation took says something about the computer only.
  const entries = texts.map(({ id }) => {
    const { cost, ...entry } = manifest[voice][id];
    return [id, entry];
  });
  const archive = packTar([
    [NOTICE, notice],
    [`${voice}/manifest.json`, Buffer.from(toJson(Object.fromEntries(entries)))],
    ...texts.map(text => [`${voice}/${text.id}.mp3`, readFileSync(soundFile(voice, text))]),
  ]);
  const checksum = sha256(archive);
  const file = packName(book, voice, checksum);
  writeFileSync(join(PACK_DIRECTORY, file), archive);
  console.log(`${file}: ${texts.length} sounds, ${(archive.length / 1e6).toFixed(1)} MB`);
  return { book, voice, file, sha256: checksum, bytes: archive.length, sounds: texts.length };
});

const others = existsSync(PACKS_FILE) ? readJson(PACKS_FILE).packs.filter(pack => pack.book !== book) : [];
const sorted = [...others, ...packs].sort((a, b) => (a.file < b.file ? -1 : 1));
writeFileSync(PACKS_FILE, toJson({ packs: sorted }));
