// Lookups of the pronunciation data: the textbook "발음" boxes of the lessons, grouped by rule type in the "Kiejtés" chapter.
import pronunciation from '../data/pronunciation';
import type { LessonPronunciation, PronunciationCategory } from '../data/types';
import { LESSONS, type LessonInfo } from './content';

export const pronunciationOf = (lesson: LessonInfo): LessonPronunciation | undefined =>
  pronunciation.lessons[lesson.key];

/** The category with its number in the chapter. */
export function categoryOf(id: string): PronunciationCategory & { number: number } {
  const index = pronunciation.categories.findIndex(category => category.id === id);
  return { ...pronunciation.categories[index], number: index + 1 };
}

/** The lessons whose box belongs to the category. */
export const lessonsOfCategory = (id: string): LessonInfo[] =>
  LESSONS.filter(lesson => pronunciationOf(lesson)?.category === id);

/** The pronunciations to show and the sign between them: an array lists steps (→), " · " separates alternatives. */
export const pronunciationParts = (value: string | string[]) =>
  Array.isArray(value)
    ? { parts: value.filter(Boolean), separator: ' → ' }
    : { parts: value.split(' · ').filter(Boolean), separator: ' · ' };
