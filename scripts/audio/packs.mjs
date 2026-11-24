// Shared by the scripts that store the sound files in a GitHub release (pack, publish, compare, download).
// A pack holds the files of one book and voice; packs.json lists the packs this version of the site uses.
import { createHash } from 'node:crypto';
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { unpackTar } from './tar.mjs';

export const REPOSITORY = 'dpappbm/sejong';
export const RELEASE = 'audio';
export const INDEX = 'index.json';
export const NOTICE = 'NOTICE.txt';

const path = relative => fileURLToPath(new URL(relative, import.meta.url));
export const AUDIO_DIRECTORY = path('../../public/audio');
export const PACK_DIRECTORY = path('work/packs');
export const PACKS_FILE = path('packs.json');

export const readJson = file => JSON.parse(readFileSync(file, 'utf8'));
export const toJson = value => JSON.stringify(value, null, 2) + '\n';
export const sha256 = content => createHash('sha256').update(content).digest('hex');

/** The name holds the checksum, so a changed pack never replaces the one an earlier version of the site uses. */
export const packName = (book, voice, checksum) => `${book}-${voice}-${checksum.slice(0, 12)}.tar`;

const MEMBER = /^(?:NOTICE\.txt|([A-Z]\d)\/(?:manifest\.json|([0-9a-f]{12})\.mp3))$/;

/**
 * The content of a pack: the sounds by id, their manifest entries and the notice. Throws if the pack is not exactly
 * the one listed, or holds anything else (a file name is never trusted).
 */
export function openPack(archive, pack) {
  if (sha256(archive) !== pack.sha256) throw new Error(`${pack.file}: the checksum is wrong`);
  const content = { sounds: new Map(), manifest: {}, notice: null };
  for (const [name, file] of unpackTar(archive)) {
    const [valid, voice, id] = MEMBER.exec(name) ?? [];
    if (!valid || (voice && voice !== pack.voice)) throw new Error(`${pack.file}: unexpected file ${name}`);
    if (id) content.sounds.set(id, file);
    else if (voice) content.manifest = JSON.parse(file.toString('utf8'));
    else content.notice = file;
  }
  return content;
}

/** Downloads a file of the release; no login needed. */
export async function fetchAsset(name, { fetch = globalThis.fetch, attempts = 3, delay = 2000 } = {}) {
  const url = `https://github.com/${REPOSITORY}/releases/download/${RELEASE}/${name}`;
  for (let attempt = 1; ; attempt++) {
    try {
      // GitHub answers the same address from a cache for a while, even that a file is missing
      const response = await fetch(`${url}?fresh=${Date.now()}-${attempt}`);
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) {
      if (attempt >= attempts) throw new Error(`${name} could not be downloaded: ${error.message}`, { cause: error });
      await new Promise(resolve => setTimeout(resolve, delay));
    }
  }
}

/** Where the build takes the sound files from. */
export function audioSource(value) {
  const source = value || 'local';
  if (!['local', 'release'].includes(source))
    throw new Error(`AUDIO_SOURCE must be "local" or "release", not "${source}"`);
  return source;
}

/** The ids of the sound files in a folder, by voice. */
export function localSounds(directory) {
  const sounds = new Map();
  let entries = [];
  try {
    entries = readdirSync(directory, { withFileTypes: true });
  } catch (error) {
    if (error.code !== 'ENOENT') throw error;
  }
  for (const entry of entries.filter(entry => entry.isDirectory())) {
    const files = readdirSync(join(directory, entry.name)).filter(name => name.endsWith('.mp3'));
    sounds.set(
      entry.name,
      files.map(name => name.slice(0, -'.mp3'.length))
    );
  }
  return sounds;
}
