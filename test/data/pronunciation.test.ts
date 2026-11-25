import { describe, expect, it } from 'vitest';
import pronunciation from '../../src/data/pronunciation';
import type { LessonPronunciation } from '../../src/data/types';
import { LESSONS, POINTS_BY_ID } from '../../src/lib/content';
import { lessonsOfCategory } from '../../src/lib/pronunciation';
import { plainText } from '../../src/lib/richText';

const entries = Object.entries(pronunciation.lessons);
/** The lessons whose box has a problem; the tests expect none. */
const failing = (hasProblem: (entry: LessonPronunciation, key: string) => boolean) =>
  entries.filter(([key, entry]) => hasProblem(entry, key)).map(([key]) => key);

describe('pronunciation boxes', () => {
  it('belong to the lessons that have a pronunciation label', () => {
    const labelled = LESSONS.filter(lesson => lesson.title.pronunciation).map(lesson => lesson.key);
    expect(entries.map(([key]) => key).sort()).toEqual([...labelled].sort());
  });

  it('have a known category', () => {
    const categories = pronunciation.categories.map(category => category.id);
    expect(failing(entry => !categories.includes(entry.category))).toEqual([]);
  });

  it('have their page in the student book and a rule', () => {
    expect(failing(entry => !entry.studentBookPage || !plainText(entry.rule))).toEqual([]);
  });

  it('translate the sample word', () => {
    expect(failing(entry => !!plainText(entry.sampleWord) && !entry.hungarian)).toEqual([]);
  });

  it('have translated examples', () => {
    expect(failing(entry => !entry.examples.length)).toEqual([]);
    expect(failing(entry => entry.examples.some(([korean, , hungarian]) => !plainText(korean) || !hungarian))).toEqual(
      []
    );
  });

  it('mark only existing structures of other lessons as used (↗)', () => {
    const isOwnLesson = (id: string, key: string) => {
      const point = POINTS_BY_ID.get(id);
      return !point || `${point.book}-${point.lesson}` === key;
    };
    expect(
      failing((entry, key) => entry.examples.some(([, , , uses = []]) => uses.some(id => isOwnLesson(id, key))))
    ).toEqual([]);
  });
});

describe('pronunciation categories', () => {
  it('are not empty', () => {
    const empty = pronunciation.categories.filter(category => !lessonsOfCategory(category.id).length);
    expect(empty.map(category => category.id)).toEqual([]);
  });

  it('have complete extra tables', () => {
    const incomplete = pronunciation.categories.flatMap(category =>
      (category.extra?.rows ?? [])
        .flatMap(([, , examples]) => examples)
        .filter(([korean, value, hungarian]) => !plainText(korean) || !value || !hungarian)
        .map(([korean]) => `${category.id}: ${plainText(korean)}`)
    );
    expect(incomplete).toEqual([]);
  });
});
