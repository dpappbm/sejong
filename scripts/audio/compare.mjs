// Compares the sound files in public/audio with the latest ones in the GitHub release by their checksums. Changes
// nothing. Usage: npm run audio:compare [-- --deep --all --directory <folder>]
// Exit code: 0 everything is the same, 1 there is a difference, 2 the release could not be read.
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { parseArgs } from 'node:util';
import { AUDIO_DIRECTORY, INDEX, PACKS_FILE, fetchAsset, localSounds, openPack, readJson, sha256 } from './packs.mjs';

const LISTED = 20;
const { values: options } = parseArgs({
  options: {
    deep: { type: 'boolean', default: false },
    all: { type: 'boolean', default: false },
    directory: { type: 'string', default: AUDIO_DIRECTORY },
  },
});

/** The index of the release; with --deep the checksums are those of the files in the packs themselves. */
async function readRelease() {
  const { packs, texts } = JSON.parse(await fetchAsset(INDEX));
  if (!options.deep) return { packs, texts };
  const opened = [];
  for (const pack of packs) {
    const { sounds } = openPack(await fetchAsset(pack.file), pack);
    opened.push({ ...pack, checksums: Object.fromEntries([...sounds].map(([id, sound]) => [id, sha256(sound)])) });
  }
  return { packs: opened, texts };
}

let release;
try {
  release = await readRelease();
} catch (error) {
  console.error(`The release could not be read: ${error.message}`);
  process.exit(2);
}

const local = localSounds(options.directory);
const checksumOf = (voice, id) => sha256(readFileSync(join(options.directory, voice, `${id}.mp3`)));
const rows = [];
const details = [];
const known = new Map();
const label = (voice, id) => `${voice}  ${id}  ${release.texts[id] ?? '(unknown text)'}`;

for (const { book, voice, checksums } of release.packs) {
  const present = new Set(local.get(voice));
  if (!known.has(voice)) known.set(voice, new Set());
  const row = { book, voice, same: 0, different: 0, 'only local': 0, 'only in the release': 0 };
  for (const [id, checksum] of Object.entries(checksums)) {
    known.get(voice).add(id);
    if (!present.has(id)) {
      row['only in the release'] += 1;
      details.push([voice, `only in the release: ${label(voice, id)}`]);
      continue;
    }
    const own = checksumOf(voice, id);
    if (own === checksum) row.same += 1;
    else {
      row.different += 1;
      details.push([
        voice,
        `different: ${label(voice, id)}  (local ${own.slice(0, 8)}, release ${checksum.slice(0, 8)})`,
      ]);
    }
  }
  rows.push(row);
}
for (const [voice, ids] of local) {
  const extra = ids.filter(id => !known.get(voice)?.has(id));
  if (!extra.length) continue;
  rows.push({ book: '-', voice, same: 0, different: 0, 'only local': extra.length, 'only in the release': 0 });
  for (const id of extra) details.push([voice, `only local: ${label(voice, id)}`]);
}

console.table(rows);
const shown = new Map();
for (const [voice, line] of details) {
  const count = (shown.get(voice) ?? 0) + 1;
  shown.set(voice, count);
  if (options.all || count <= LISTED) console.log(line);
}
for (const [voice, count] of shown)
  if (!options.all && count > LISTED) console.log(`${voice}: ${count - LISTED} more, list them with --all`);

const withoutChecksums = ({ checksums, ...pack }) => pack;
const isPinned =
  JSON.stringify(readJson(PACKS_FILE).packs) === JSON.stringify(release.packs.map(pack => withoutChecksums(pack)));
console.log(
  isPinned
    ? 'packs.json: the same packs as in the release'
    : 'packs.json: NOT the latest packs of the release, so the published site uses other files'
);
console.log(details.length ? `${details.length} differences` : 'The local files and the release are the same.');
process.exitCode = details.length || !isPinned ? 1 : 0;
