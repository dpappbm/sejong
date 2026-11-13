// The vocabulary of every lesson, keyed like the lessons in the other data files ("3A-9").
// Each book has its own file keyed by lesson number.
import type { LessonVocabulary } from '../types';
import book1A from './1A';
import book1B from './1B';
import book2A from './2A';
import book2B from './2B';
import book3A from './3A';
import book3B from './3B';
import book4A from './4A';
import book4B from './4B';

const VOCABULARY_BY_BOOK: Record<string, Record<number, LessonVocabulary>> = {
  '1A': book1A,
  '1B': book1B,
  '2A': book2A,
  '2B': book2B,
  '3A': book3A,
  '3B': book3B,
  '4A': book4A,
  '4B': book4B,
};

const vocabulary: Record<string, LessonVocabulary> = Object.fromEntries(
  Object.entries(VOCABULARY_BY_BOOK).flatMap(([book, lessons]) =>
    Object.entries(lessons).map(([lesson, lessonVocabulary]) => [`${book}-${lesson}`, lessonVocabulary]),
  ),
);

export default vocabulary;
