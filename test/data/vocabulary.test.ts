import { describe, expect, it } from 'vitest';
import { VOCABULARY_SOURCES, type VocabularyRow } from '../../src/data/types';
import vocabulary from '../../src/data/vocabulary';
import { LESSONS, POINTS_BY_ID } from '../../src/lib/content';
import { vocabularySource, vocabularyUses } from '../../src/lib/vocabulary';

const lessons = Object.entries(vocabulary).map(([key, { textbook = [], own = [] }]) => ({
  key,
  rows: [...textbook, ...own],
}));
/** The rows with a problem; the tests expect none. */
const failing = (hasProblem: (row: VocabularyRow, key: string) => boolean) =>
  lessons.flatMap(({ key, rows }) => rows.filter(row => hasProblem(row, key)).map(row => `${key}: ${row[0]}`));

describe('vocabulary', () => {
  it('belongs to existing lessons', () => {
    const lessonKeys = LESSONS.map(lesson => lesson.key);
    expect(lessons.map(lesson => lesson.key).filter(key => !lessonKeys.includes(key))).toEqual([]);
  });

  it('has only textbook and own words', () => {
    const unknown = Object.entries(vocabulary).flatMap(([key, parts]) =>
      Object.keys(parts)
        .filter(part => part !== 'textbook' && part !== 'own')
        .map(part => `${key}: ${part}`)
    );
    expect(unknown).toEqual([]);
  });

  it('is not empty', () => {
    expect(lessons.filter(({ rows }) => !rows.length).map(({ key }) => key)).toEqual([]);
  });

  it('has complete rows', () => {
    expect(failing(row => row.length < 2 || row.length > 3 || !row[0] || !row[1])).toEqual([]);
  });

  it('has known sources', () => {
    const sources: readonly (string | undefined)[] = [...VOCABULARY_SOURCES, undefined];
    expect(failing(row => !sources.includes(vocabularySource(row)))).toEqual([]);
  });

  it('lists every word once in a lesson', () => {
    const repeated = lessons.flatMap(({ key, rows }) => {
      const words = rows.map(row => row[0]);
      return words.filter((word, index) => words.indexOf(word) !== index).map(word => `${key}: ${word}`);
    });
    expect(repeated).toEqual([]);
  });

  // Upper-case abbreviations are part of Korean words (PC방); any other Latin letter means a swapped column.
  it('has no Latin letters in the Korean column', () => {
    expect(failing(([korean]) => /[A-Za-z]/.test(korean.replace(/\([^)]*\)/g, '').replace(/[A-Z]{2,}/g, '')))).toEqual(
      []
    );
  });

  it('marks only existing structures of other lessons as used (↗)', () => {
    const isOwnLesson = (id: string, key: string) => {
      const point = POINTS_BY_ID.get(id);
      return !point || `${point.book}-${point.lesson}` === key;
    };
    expect(failing((row, key) => vocabularyUses(row).some(id => isOwnLesson(id, key)))).toEqual([]);
  });
});
