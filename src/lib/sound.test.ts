import { describe, expect, it } from 'vitest';
import { audioId } from '../../scripts/audio/spoken-text.mjs';
import { createSoundButton, VOICES } from './sound';

const settings = {
  books: new Set(['3A']),
  voices: ['F1', 'M4'],
  hasFile: () => true,
  spokenForms: { '3월': '삼월' },
  excluded: {} as Record<string, string[]>,
};

describe('soundButton', () => {
  it('names the file of the spoken text, without markup', () => {
    const button = createSoundButton(settings)('<b>나라</b>가 커요.', '3A');
    expect(button).toContain(`data-sound="${audioId('나라가 커요.')}"`);
    expect(button).toContain('aria-label="Meghallgatás: 나라가 커요."');
    expect(button).not.toContain('data-without');
    expect(createSoundButton(settings)('3월', '3A')).toContain(`data-sound="${audioId('삼월')}"`);
  });

  it('has no text of its own', () => {
    expect(createSoundButton(settings)('나라', '3A')).toMatch(/^<button [^>]*><\/button>$/);
  });

  it('is left out for another book, and where no book is given', () => {
    expect(createSoundButton(settings)('나라', '1A')).toBe('');
    expect(createSoundButton(settings)('나라', undefined)).toBe('');
  });

  it('is left out if a file is missing for a voice', () => {
    expect(createSoundButton({ ...settings, hasFile: voice => voice === 'F1' })('나라', '3A')).toBe('');
  });

  it('is left out for a text that cannot be read aloud', () => {
    expect(createSoundButton(settings)('케이팝(K-POP)', '3A')).toBe('');
  });

  it('lists the voices that say the text wrong, whose file is not needed', () => {
    const excluded = { 나라: ['M4'] };
    const button = createSoundButton({ ...settings, excluded, hasFile: voice => voice === 'F1' })('나라', '3A');
    expect(button).toContain('data-without="M4"');
  });

  it('is left out if every voice says the text wrong', () => {
    expect(createSoundButton({ ...settings, excluded: { 나라: ['F1', 'M4'] } })('나라', '3A')).toBe('');
  });
});

describe('VOICES', () => {
  it('has different names', () => {
    expect(new Set(VOICES.map(voice => voice.label)).size).toBe(VOICES.length);
  });
});
