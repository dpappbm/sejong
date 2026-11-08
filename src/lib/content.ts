// The content index: books, lessons in order, grammar points by id, and the page location of every id.
import book1A from '../data/books/1A';
import book1B from '../data/books/1B';
import book2A from '../data/books/2A';
import book2B from '../data/books/2B';
import book3A from '../data/books/3A';
import book3B from '../data/books/3B';
import book4A from '../data/books/4A';
import book4B from '../data/books/4B';
import type { BookData, Lesson, Point } from '../data/types';

export const BOOKS = ['1A', '1B', '2A', '2B', '3A', '3B', '4A', '4B'] as const;
export type BookCode = (typeof BOOKS)[number];

export const BOOK_DATA: Record<BookCode, BookData> = {
  '1A': book1A, '1B': book1B, '2A': book2A, '2B': book2B, '3A': book3A, '3B': book3B, '4A': book4A, '4B': book4B,
};

export interface Level {
  id: string;
  books: BookCode[];
  korean: string;
  hungarian: string;
  color: 'green' | 'blue' | 'purple' | 'orange';
}

export const LEVELS: Level[] = [
  { id: 'beginner1', books: ['1A', '1B'], korean: '초급 1', hungarian: 'Kezdő 1', color: 'green' },
  { id: 'beginner2', books: ['2A', '2B'], korean: '초급 2', hungarian: 'Kezdő 2', color: 'blue' },
  { id: 'intermediate1', books: ['3A', '3B'], korean: '중급 1', hungarian: 'Középhaladó 1', color: 'purple' },
  { id: 'intermediate2', books: ['4A', '4B'], korean: '중급 2', hungarian: 'Középhaladó 2', color: 'orange' },
];

/** Global id of a grammar point, e.g. pointId('3A', 9, 1) → "3A-09-1". */
export const pointId = (book: string, lesson: number, point: number) => `${book}-${String(lesson).padStart(2, '0')}-${point}`;
export const lessonId = (book: string, lesson: number) => `lesson-${book}-${lesson}`;
/** Key of a lesson in the data files, e.g. "3A-9". */
export const lessonKey = (book: string, lesson: number) => `${book}-${lesson}`;
/** Linear position of a lesson, for "already learned / not yet" comparisons. */
export const positionOf = (book: string, lesson: number | string) => BOOKS.indexOf(book as BookCode) * 100 + Number(lesson);

const POINT_ID_PATTERN = /^([1-4][AB])-(\d\d)-(\d)$/;
export const isPointId = (id: string) => POINT_ID_PATTERN.test(id);

export interface PointInfo extends Point {
  book: BookCode;
  id: string;
}

export interface LessonInfo {
  book: BookCode;
  lesson: number;
  key: string;
  title: Lesson;
  points: PointInfo[];
}

const byLessonAndPoint = (a: Point, b: Point) => a.lesson - b.lesson || a.point - b.point;

export const POINTS_BY_ID = new Map<string, PointInfo>();
for (const book of BOOKS) {
  for (const point of BOOK_DATA[book].points) POINTS_BY_ID.set(pointId(book, point.lesson, point.point), { ...point, book, id: pointId(book, point.lesson, point.point) });
}

/** Lessons that have grammar points, in textbook order. */
export const LESSONS: LessonInfo[] = BOOKS.flatMap(book => {
  const points = [...BOOK_DATA[book].points].sort(byLessonAndPoint);
  const lessonNumbers = [...new Set(points.map(point => point.lesson))];
  return lessonNumbers.map(lesson => ({
    book,
    lesson,
    key: lessonKey(book, lesson),
    title: BOOK_DATA[book].lessons[lesson] ?? { korean: '', hungarian: '' },
    points: points.filter(point => point.lesson === lesson).map(point => POINTS_BY_ID.get(pointId(book, lesson, point.point))!),
  }));
});

export const POINT_COUNT = POINTS_BY_ID.size;

// ---------- page locations ----------
export const lessonPath = (book: string, lesson: number | string) => `/${book.toLowerCase()}/${lesson}/`;
export const CHAPTER_PATHS = { basics: '/basics/', pronunciation: '/pronunciation/', honorifics: '/honorifics/' } as const;

export interface Location {
  path: string;
  /** Element id on the page; empty for the top of the page. */
  anchor: string;
}

/** The page and element of a global id (point, lesson, basic rule, pronunciation category, honorific category). */
export function locate(id: string): Location | null {
  let match = POINT_ID_PATTERN.exec(id);
  if (match) return { path: lessonPath(match[1], Number(match[2])), anchor: `point-${match[3]}` };
  if ((match = /^lesson-([1-4][AB])-(\d+)$/.exec(id))) return { path: lessonPath(match[1], match[2]), anchor: '' };
  if (/^rule-\d+$/.test(id)) return { path: CHAPTER_PATHS.basics, anchor: id };
  if ((match = /^pronunciation-(.+)$/.exec(id))) return { path: CHAPTER_PATHS.pronunciation, anchor: match[1] };
  if ((match = /^honorific-category-(\d+)$/.exec(id))) return { path: CHAPTER_PATHS.honorifics, anchor: `category-${match[1]}` };
  return null;
}

const BASE = (import.meta.env?.BASE_URL ?? '/').replace(/\/$/, '');
/** A site path with the deploy base prepended. */
export const withBase = (path: string) => BASE + path;
