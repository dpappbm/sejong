// Practice data of a whole book: the rows of every lesson by kind, served as /<book>/practice.json
// (src/pages/[book]/practice.json.ts) and fetched by the book practice dialog when it is opened.
import type { KoreanHungarian } from '../data/types';
import { LESSONS, type BookCode } from './content';
import { buildLessonExport } from './lessonExport';

export const PRACTICE_ROW_KINDS = ['rules', 'examples', 'textbookVocabulary', 'ownVocabulary'] as const;
export type PracticeRowKind = (typeof PRACTICE_ROW_KINDS)[number];

export interface PracticeLesson {
  /** "1A-5", like the values of the "Hol tartasz?" menu. */
  key: string;
  lesson: number;
  title: string;
  /** The forms of the grammar points, for the lesson list. */
  forms: string[];
  rows: Record<PracticeRowKind, KoreanHungarian[]>;
}

export interface BookPractice {
  book: BookCode;
  lessons: PracticeLesson[];
}

export function buildBookPractice(book: BookCode): BookPractice {
  return {
    book,
    lessons: LESSONS.filter(lesson => lesson.book === book).map(lesson => {
      const data = buildLessonExport(lesson);
      return {
        key: lesson.key,
        lesson: lesson.lesson,
        title: lesson.title.korean,
        forms: data.points.map(point => point.form),
        rows: {
          rules: data.points.map(point => point.rule),
          examples: data.points.flatMap(point => point.examples),
          textbookVocabulary: data.vocabulary?.textbook ?? [],
          ownVocabulary: data.vocabulary?.own ?? [],
        },
      };
    }),
  };
}
