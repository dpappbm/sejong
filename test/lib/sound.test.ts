import { experimental_AstroContainer as AstroContainer } from 'astro/container';
import { describe, expect, it } from 'vitest';
import { audioId } from '../../scripts/audio/spoken-text.mjs';
import SoundButton from '../../src/components/SoundButton.astro';
import { bold, text } from '../../src/lib/richText';
import { createSoundOf, hasSound, VOICES } from '../../src/lib/sound';

const settings = {
  books: new Set(['3A']),
  voices: ['F1', 'M4'],
  hasFile: () => true,
  spokenForms: { '3월': '삼월' },
  excluded: {} as Record<string, string[]>,
};

describe('soundOf', () => {
  it('names the file of the spoken text, without formatting', () => {
    const soundOf = createSoundOf(settings);
    expect(soundOf(text`${bold('나라')}가 커요.`, '3A')).toEqual({ id: audioId('나라가 커요.'), without: [] });
    expect(soundOf('3월', '3A')!.id).toBe(audioId('삼월'));
  });

  it('is null for another book, and where no book is given', () => {
    expect(createSoundOf(settings)('나라', '1A')).toBeNull();
    expect(createSoundOf(settings)('나라', undefined)).toBeNull();
  });

  it('is null if a file is missing for a voice', () => {
    expect(createSoundOf({ ...settings, hasFile: voice => voice === 'F1' })('나라', '3A')).toBeNull();
  });

  it('is null for a text that cannot be read aloud', () => {
    expect(createSoundOf(settings)('케이팝(K-POP)', '3A')).toBeNull();
  });

  it('lists the voices that say the text wrong, whose file is not needed', () => {
    const excluded = { 나라: ['M4'] };
    const soundOf = createSoundOf({ ...settings, excluded, hasFile: voice => voice === 'F1' });
    expect(soundOf('나라', '3A')!.without).toEqual(['M4']);
  });

  it('is null if every voice says the text wrong', () => {
    expect(createSoundOf({ ...settings, excluded: { 나라: ['F1', 'M4'] } })('나라', '3A')).toBeNull();
  });
});

describe('SoundButton', () => {
  // Any text inside would become part of the Korean text (links, copying).
  it.skipIf(!hasSound)('has no text of its own', async () => {
    const container = await AstroContainer.create();
    const korean = text`요즘 좀 피곤${bold('해 보여요')}.`;
    const button = await container.renderToString(SoundButton, { props: { korean, book: '3A' } });
    expect(button.trim()).toMatch(/^<button [^>]*><\/button>$/);
    expect(button).toContain('aria-label="Meghallgatás: 요즘 좀 피곤해 보여요."');
  });

  it('is left out where no book is given', async () => {
    const container = await AstroContainer.create();
    expect((await container.renderToString(SoundButton, { props: { korean: '나라' } })).trim()).toBe('');
  });
});

describe('VOICES', () => {
  it('has different names', () => {
    expect(new Set(VOICES.map(voice => voice.label)).size).toBe(VOICES.length);
  });
});
