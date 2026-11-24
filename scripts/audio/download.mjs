// Fills public/audio from the packs of packs.json in the GitHub release. A file that is already there is kept, unless
// --force is given. Usage: npm run audio:download [-- --force --directory <folder>]
// With --build (first step of "npm run build") it only runs if AUDIO_SOURCE=release.
import { existsSync, mkdirSync, readFileSync, renameSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { parseArgs } from 'node:util';
import {
  AUDIO_DIRECTORY,
  NOTICE,
  PACKS_FILE,
  audioSource,
  fetchAsset,
  localSounds,
  openPack,
  readJson,
  toJson,
} from './packs.mjs';

const { values: options } = parseArgs({
  options: {
    build: { type: 'boolean', default: false },
    force: { type: 'boolean', default: false },
    directory: { type: 'string', default: AUDIO_DIRECTORY },
  },
});

/** Writes under a temporary name first, so that an interrupted run leaves no half file. */
function write(file, content) {
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(`${file}.part`, content);
  renameSync(`${file}.part`, file);
}

async function download() {
  // Everything is downloaded and checked before the first file is written.
  const opened = [];
  for (const pack of readJson(PACKS_FILE).packs)
    opened.push({ pack, content: openPack(await fetchAsset(pack.file), pack) });

  const manifestFile = join(options.directory, 'manifest.json');
  const manifest = existsSync(manifestFile) ? readJson(manifestFile) : {};
  const count = { written: 0, same: 0, kept: 0 };
  for (const { pack, content } of opened) {
    for (const [id, sound] of content.sounds) {
      const file = join(options.directory, pack.voice, `${id}.mp3`);
      const isPresent = existsSync(file);
      const isSame = isPresent && readFileSync(file).equals(sound);
      if (isPresent && !isSame && !options.force) {
        count.kept += 1;
        continue;
      }
      if (isSame) count.same += 1;
      else {
        write(file, sound);
        count.written += 1;
      }
      // how the file was made, so that generate.py does not make it again
      if (!isSame || !manifest[pack.voice]?.[id]) (manifest[pack.voice] ??= {})[id] = content.manifest[id];
    }
    if (content.notice) write(join(options.directory, NOTICE), content.notice);
  }
  // the site does not need the manifest
  if (!options.build) write(manifestFile, toJson(manifest));
  const voices = localSounds(options.directory).size;
  console.log(`sounds: ${count.written} written, ${count.same} already there, ${voices} voices`);
  if (count.kept) console.log(`sounds: ${count.kept} local files differ from the release and were kept (see --force)`);
}

if (!options.build || audioSource(process.env.AUDIO_SOURCE) === 'release') await download();
