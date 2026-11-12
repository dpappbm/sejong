// Export data of a lesson: Korean–Hungarian rows for flash-card tools (one "korean<TAB>hungarian" line per row).
import vocabulary from '../data/vocabulary';
import type { CorrectSample, KoreanHungarian } from '../data/types';
import type { LessonInfo, PointInfo } from './content';
import { stripTags } from './html';

export interface PointExport {
  /** Number of the point within the lesson. */
  point: number;
  /** The Korean form without HTML. */
  form: string;
  /** The header of the card: [form, Hungarian name]. */
  rule: KoreanHungarian;
  /** The example sentences and the correct usage samples that have a translation. */
  examples: KoreanHungarian[];
}

export interface LessonExport {
  points: PointExport[];
  /** null: the lesson has no vocabulary yet. */
  vocabulary: { textbook: KoreanHungarian[]; own: KoreanHungarian[] } | null;
}

/** Plain text on one line: no HTML, no tabs or line breaks (they would break the row format). */
const plainText = (html: string) => stripTags(html)
  .replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&')
  .replace(/\s+/g, ' ')
  .trim();

function uniqueRows(rows: KoreanHungarian[]): KoreanHungarian[] {
  const seen = new Set<string>();
  return rows.filter(([korean, hungarian]) => {
    const key = `${korean}\t${hungarian}`;
    if (!korean || !hungarian || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function pointExport(point: PointInfo): PointExport {
  const examples = (point.examples ?? []).map(([korean, hungarian]): KoreanHungarian => [plainText(korean), plainText(hungarian)]);
  // Incorrect samples are never exported; a correct one goes with its translation, without its note.
  const correctSamples = (point.correctIncorrect ?? [])
    .filter((sample): sample is CorrectSample => 'correct' in sample)
    .map((sample): KoreanHungarian => [plainText(sample.correct), plainText(sample.translation)]);
  const form = plainText(point.form);
  return { point: point.point, form, rule: [form, plainText(point.name)], examples: uniqueRows([...examples, ...correctSamples]) };
}

export function buildLessonExport(lesson: LessonInfo): LessonExport {
  const lessonVocabulary = vocabulary[lesson.key];
  const rows = (part: KoreanHungarian[] | undefined) => uniqueRows((part ?? []).map(([korean, hungarian]): KoreanHungarian => [plainText(korean), plainText(hungarian)]));
  const textbook = rows(lessonVocabulary?.textbook);
  const own = rows(lessonVocabulary?.own);
  return {
    points: lesson.points.map(pointExport),
    vocabulary: textbook.length || own.length ? { textbook, own } : null,
  };
}
