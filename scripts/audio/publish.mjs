// Uploads the packs of packs.json that the GitHub release does not have yet, and index.json with the checksum of every
// sound file (read by compare.mjs). Then deletes the packs that neither this packs.json nor the one on the main branch
// lists: until the merge the published site is still built from the latter. Needs a logged-in gh.
// Usage: npm run audio:publish (dry run) | -- --write
import { spawnSync } from 'node:child_process';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';
import {
  INDEX,
  NOTICE,
  PACK_DIRECTORY,
  PACKS_FILE,
  RELEASE,
  REPOSITORY,
  fetchAsset,
  openPack,
  readJson,
  sha256,
  stalePacks,
  toJson,
} from './packs.mjs';

const { values: options } = parseArgs({ options: { write: { type: 'boolean', default: false } } });

function runGh(args) {
  const { status, stdout, stderr, error } = spawnSync('gh', args, { encoding: 'utf8' });
  if (error) throw new Error(`gh could not be started: ${error.message}`);
  if (status !== 0) throw new Error(stderr.trim());
  return stdout;
}

const gh = (...args) => runGh([...args, '--repo', REPOSITORY]);

/** The packs the published site uses. */
function packsOfMain() {
  const path = `repos/${REPOSITORY}/contents/scripts/audio/packs.json?ref=main`;
  return JSON.parse(runGh(['api', path, '-H', 'Accept: application/vnd.github.raw+json'])).packs;
}

/** The checksum of each file of the release by name, or null when there is no release yet. */
function publishedAssets() {
  try {
    const { assets } = JSON.parse(gh('release', 'view', RELEASE, '--json', 'assets'));
    return new Map(assets.map(({ name, digest }) => [name, digest?.replace('sha256:', '')]));
  } catch (error) {
    if (/release not found/.test(error.message)) return null;
    throw error;
  }
}

const { packs } = readJson(PACKS_FILE);
const published = publishedAssets();
const previousIndex = published?.has(INDEX) ? JSON.parse(await fetchAsset(INDEX)) : { packs: [], texts: {} };

const uploads = [];
const texts = {};
const indexed = packs.map(pack => {
  const local = join(PACK_DIRECTORY, pack.file);
  const isPublished = published?.has(pack.file);
  if (isPublished && published.get(pack.file) !== pack.sha256)
    throw new Error(`${pack.file} is in the release with different content`);
  if (existsSync(local)) {
    const { sounds, manifest } = openPack(readFileSync(local), pack);
    if (!isPublished) uploads.push(local);
    for (const id of sounds.keys()) texts[id] = manifest[id].text;
    return { ...pack, checksums: Object.fromEntries([...sounds].map(([id, sound]) => [id, sha256(sound)])) };
  }
  // packed on another computer: its checksums are in the release
  const previous = previousIndex.packs.find(({ file }) => file === pack.file);
  if (!isPublished || !previous) throw new Error(`${pack.file} is neither in the release nor in ${PACK_DIRECTORY}`);
  for (const id of Object.keys(previous.checksums)) texts[id] = previousIndex.texts[id];
  return previous;
});
const index = toJson({ packs: indexed, texts });
const isIndexNew = published?.get(INDEX) !== sha256(index);
const stale = published ? stalePacks(published.keys(), [packs, packsOfMain()]) : [];

console.log(published ? `Release "${RELEASE}": ${published.size} files` : `Release "${RELEASE}" does not exist yet`);
for (const file of uploads) console.log(`to upload: ${file}`);
if (isIndexNew) console.log(`to upload: ${INDEX}`);
for (const name of stale) console.log(`to delete: ${name}`);
if (!uploads.length && !isIndexNew && !stale.length) console.log('Everything is published.');
else if (!options.write) console.log('Nothing changed. Add --write to upload and delete.');
else {
  if (!published)
    gh(
      ...['release', 'create', RELEASE, '--target', 'main', '--latest=false', '--title', 'Sound files'],
      ...['--notes-file', fileURLToPath(new URL(NOTICE, import.meta.url))]
    );
  for (const file of uploads) gh('release', 'upload', RELEASE, file);
  // last, so that it never lists a pack that is not there
  if (isIndexNew) {
    const file = join(PACK_DIRECTORY, INDEX);
    writeFileSync(file, index);
    gh('release', 'upload', RELEASE, file, '--clobber');
  }
  const now = publishedAssets();
  for (const pack of packs)
    if (now.get(pack.file) !== pack.sha256) throw new Error(`${pack.file}: GitHub reports a different checksum`);
  if (now.get(INDEX) !== sha256(index)) throw new Error(`${INDEX}: GitHub reports a different checksum`);
  console.log('Everything is published, the checksums agree with those of GitHub.');
  for (const name of stale) {
    gh('release', 'delete-asset', RELEASE, name, '--yes');
    console.log(`deleted: ${name}`);
  }
}
