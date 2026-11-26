import { describe, expect, it } from 'vitest';
import { buildBookPractice, PRACTICE_ROW_KINDS } from '../../src/lib/bookPractice';
import { BOOKS, LESSONS } from '../../src/lib/content';
import { bookCards, canPlay, learnedLessonKeys } from '../../src/lib/flashcards';
import { buildLessonExport } from '../../src/lib/lessonExport';

const allKeys = (book: (typeof BOOKS)[number]) => buildBookPractice(book).lessons.map(lesson => lesson.key);

describe('book practice', () => {
  it('has every lesson of the book with the rows of its lesson export', () => {
    for (const book of BOOKS) {
      const practice = buildBookPractice(book);
      const lessons = LESSONS.filter(lesson => lesson.book === book);
      expect(practice.lessons.map(lesson => lesson.key)).toEqual(lessons.map(lesson => lesson.key));
      for (const [index, lesson] of lessons.entries()) {
        const data = buildLessonExport(lesson);
        const { rows } = practice.lessons[index];
        expect(rows.rules).toEqual(data.points.map(point => point.rule));
        expect(rows.examples).toEqual(data.points.flatMap(point => point.examples));
        expect(rows.textbookVocabulary).toEqual(data.vocabulary?.textbook ?? []);
        expect(rows.ownVocabulary).toEqual(data.vocabulary?.own ?? []);
      }
    }
  });

  it('selects cards by lesson and row kind, a repeated row once', () => {
    const practice = buildBookPractice('1A');
    const [first, second] = practice.lessons;
    const rules = bookCards(practice, [first.key], ['rules']);
    expect(rules.map(asked => [asked.korean, asked.hungarian])).toEqual(first.rows.rules);
    expect(rules.every(asked => asked.kind === 'rule')).toBe(true);
    const words = bookCards(practice, [second.key], ['textbookVocabulary', 'ownVocabulary']);
    expect(words.every(asked => asked.kind === 'vocabulary')).toBe(true);
    const all = bookCards(practice, allKeys('1A'), [...PRACTICE_ROW_KINDS]);
    const rowKeys = all.map(asked => `${asked.korean}\t${asked.hungarian}`);
    expect(new Set(rowKeys).size).toBe(rowKeys.length);
    expect(bookCards(practice, [], [...PRACTICE_ROW_KINDS])).toEqual([]);
    expect(bookCards(practice, allKeys('1A'), [])).toEqual([]);
  });

  it('knows the lessons learned so far', () => {
    const practice = buildBookPractice('2A');
    const keys = allKeys('2A');
    expect(learnedLessonKeys(practice, '')).toEqual([]);
    expect(learnedLessonKeys(practice, 'ALL')).toEqual(keys);
    expect(learnedLessonKeys(practice, '1B-3')).toEqual([]);
    expect(learnedLessonKeys(practice, '3A-1')).toEqual(keys);
    const third = practice.lessons[2];
    expect(learnedLessonKeys(practice, third.key)).toEqual(keys.slice(0, 3));
  });

  it('can play every book with everything selected', () => {
    for (const book of BOOKS) {
      const cards = bookCards(buildBookPractice(book), allKeys(book), [...PRACTICE_ROW_KINDS]);
      expect(cards.length, book).toBeGreaterThan(100);
      expect(canPlay(cards, cards), book).toBe(true);
    }
  });
});
