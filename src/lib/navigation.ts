// The previous / next chain of the pages: home ← basic rules ↔ pronunciation ↔ honorific words ↔ 1A 1 … 4B last → home.
import { CHAPTER_PATHS, LESSONS, lessonPath } from './content';

export interface PageLink {
  path: string;
  label: string;
  /** Korean title shown after the label (lessons). */
  korean?: string;
}

const HOME: PageLink = { path: '/', label: 'Főoldal' };

export const PAGE_SEQUENCE: PageLink[] = [
  { path: CHAPTER_PATHS.basics, label: 'Alapszabályok' },
  { path: CHAPTER_PATHS.pronunciation, label: 'Kiejtés' },
  { path: CHAPTER_PATHS.honorifics, label: 'Tiszteleti szavak' },
  ...LESSONS.map(lesson => ({ path: lessonPath(lesson.book, lesson.lesson), label: `${lesson.book} · ${lesson.lesson}. lecke`, korean: lesson.title.korean })),
];

/** The previous and next page of a page in the chain; both ends lead to the home page. */
export function neighbours(path: string): { previous: PageLink; next: PageLink } {
  const index = PAGE_SEQUENCE.findIndex(page => page.path === path);
  if (index < 0) throw new Error(`page not in the navigation chain: ${path}`);
  return { previous: PAGE_SEQUENCE[index - 1] ?? HOME, next: PAGE_SEQUENCE[index + 1] ?? HOME };
}
