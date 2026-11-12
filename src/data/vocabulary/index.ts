// The vocabulary of every lesson, keyed like the lessons in the other data files ("3A-9").
// Each book has its own file keyed by lesson number; a book's file is added when its first words arrive.
import type { LessonVocabulary } from '../types';
import book3A from './3A';

const VOCABULARY_BY_BOOK: Record<string, Record<number, LessonVocabulary>> = {
  '3A': book3A,
};

const vocabulary: Record<string, LessonVocabulary> = Object.fromEntries(
  Object.entries(VOCABULARY_BY_BOOK).flatMap(([book, lessons]) =>
    Object.entries(lessons).map(([lesson, lessonVocabulary]) => [`${book}-${lesson}`, lessonVocabulary]),
  ),
);

export default vocabulary;
