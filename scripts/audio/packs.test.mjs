import { describe, expect, it, vi } from 'vitest';
import { audioSource, fetchAsset, openPack, packName, sha256 } from './packs.mjs';
import { packTar, unpackTar } from './tar.mjs';

const files = [
  ['NOTICE.txt', Buffer.from('machine voice')],
  ['F1/manifest.json', Buffer.from('{"0123456789ab":{"text":"나라"}}')],
  ['F1/0123456789ab.mp3', Buffer.alloc(1300, 7)],
];
const listed = archive => ({ file: 'pack.tar', voice: 'F1', sha256: sha256(archive) });

describe('tar', () => {
  it('gives back what was packed', () => {
    const boundary = [...files, ['empty', Buffer.alloc(0)], ['block', Buffer.alloc(512, 1)]];
    const unpacked = unpackTar(packTar(boundary));
    expect(unpacked.map(([name]) => name)).toEqual(boundary.map(([name]) => name));
    unpacked.forEach(([, content], i) => expect(content.equals(boundary[i][1])).toBe(true));
  });

  it('packs the same content to the same bytes', () => {
    expect(packTar(files).equals(packTar(files))).toBe(true);
  });

  it('refuses a damaged or cut off archive', () => {
    const damaged = packTar(files);
    damaged[3] ^= 1;
    expect(() => unpackTar(damaged)).toThrow('Damaged');
    expect(() => unpackTar(packTar(files).subarray(0, 1200))).toThrow('Damaged');
  });

  it('refuses a long name', () => {
    expect(() => packTar([['a'.repeat(100), Buffer.alloc(1)]])).toThrow('too long');
  });
});

describe('openPack', () => {
  it('reads the sounds, the manifest and the notice', () => {
    const archive = packTar(files);
    const { sounds, manifest, notice } = openPack(archive, listed(archive));
    expect([...sounds.keys()]).toEqual(['0123456789ab']);
    expect(manifest['0123456789ab'].text).toBe('나라');
    expect(notice.toString()).toBe('machine voice');
  });

  it('refuses a wrong checksum', () => {
    const archive = packTar(files);
    expect(() => openPack(archive, { ...listed(archive), sha256: '0'.repeat(64) })).toThrow('checksum');
  });

  it.each(['../evil.mp3', 'F1/../../evil.mp3', '/evil.mp3', 'F1/name.mp3', 'M4/0123456789ab.mp3', 'index.html'])(
    'refuses a file named %s',
    name => {
      const archive = packTar([[name, Buffer.alloc(1)]]);
      expect(() => openPack(archive, listed(archive))).toThrow('unexpected file');
    }
  );
});

describe('packName', () => {
  it('depends on the content', () => {
    expect(packName('3A', 'F1', 'abcdef0123456789')).toBe('3A-F1-abcdef012345.tar');
  });
});

describe('fetchAsset', () => {
  it('tries again after an error', async () => {
    const fetch = vi.fn().mockRejectedValueOnce(new Error('offline')).mockResolvedValueOnce(new Response('content'));
    expect((await fetchAsset('a.tar', { fetch, delay: 0 })).toString()).toBe('content');
    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch.mock.calls[0][0]).not.toBe(fetch.mock.calls[1][0]);
  });

  it('gives up after three attempts', async () => {
    const fetch = vi.fn(async () => new Response('', { status: 404 }));
    await expect(fetchAsset('a.tar', { fetch, delay: 0 })).rejects.toThrow('HTTP 404');
    expect(fetch).toHaveBeenCalledTimes(3);
  });
});

describe('audioSource', () => {
  it('is local unless set otherwise', () => {
    expect(audioSource(undefined)).toBe('local');
    expect(audioSource('')).toBe('local');
    expect(audioSource('release')).toBe('release');
    expect(() => audioSource('zip')).toThrow('AUDIO_SOURCE');
  });
});
