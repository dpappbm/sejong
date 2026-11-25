import { describe, expect, it } from 'vitest';
import { LESSONS, POINT_COUNT, type PointInfo } from '../../src/lib/content';
import { exampleParts } from '../../src/lib/richText';
import { incompleteExamples, incompleteSamples, untranslatedKorean } from '../helpers';

const points = LESSONS.flatMap(lesson => lesson.points);
/** The ids of the points with a problem; the tests expect none. */
const failing = (hasProblem: (point: PointInfo) => boolean | undefined) =>
  points.filter(hasProblem).map(point => point.id);

describe('grammar points', () => {
  it('are 188', () => {
    expect(POINT_COUNT).toBe(188);
    expect(points).toHaveLength(188);
  });

  it('have an explanation', () => {
    expect(failing(point => !point.explanation.length)).toEqual([]);
  });

  it('have their pages in the textbooks', () => {
    expect(failing(point => !point.studentBookPage || !point.vocabularyGrammarPage)).toEqual([]);
  });

  it('have at least 3 examples', () => {
    expect(failing(point => !point.examples || point.examples.length < 3)).toEqual([]);
  });

  it('have examples with translations', () => {
    expect(points.flatMap(point => incompleteExamples(point.id, point.examples))).toEqual([]);
  });

  it('have correct samples with a translation and incorrect ones with a reason', () => {
    expect(points.flatMap(point => incompleteSamples(point.id, point.correctIncorrect))).toEqual([]);
  });

  it('have irregular rows if they are conjugated', () => {
    expect(
      failing(
        ({ conjugable, table, irregularRowsOptional }) =>
          conjugable !== false && table && table.kind !== 'noun' && table.irregular === false && !irregularRowsOptional
      )
    ).toEqual([]);
  });

  it('translate every Korean cell of the hand-written tables', () => {
    expect(points.flatMap(point => untranslatedKorean(point.id, point.customContent ?? []))).toEqual([]);
  });

  it('mark only structures of other lessons as used (↗ ↖)', () => {
    const sameLesson = points.flatMap(point =>
      [...(point.examples ?? []), ...(point.honorific?.examples ?? [])]
        .flatMap(example => exampleParts(example).uses)
        .filter(id => id.startsWith(point.id.slice(0, -1)))
        .map(id => `${point.id} → ${id}`)
    );
    expect(sameLesson).toEqual([]);
  });
});

describe('honorific sections', () => {
  const sections = points.flatMap(({ id, honorific }) => (honorific ? [{ id, honorific }] : []));

  it('have complete rows', () => {
    const incomplete = sections.flatMap(({ id, honorific }) =>
      (honorific.rows ?? []).filter(row => row.length < 4 || row.some(cell => !cell)).map(row => `${id}: ${row}`)
    );
    expect(incomplete).toEqual([]);
  });

  it('have at least 2 examples, with translations', () => {
    expect(sections.filter(({ honorific }) => (honorific.examples?.length ?? 0) < 2).map(({ id }) => id)).toEqual([]);
    expect(sections.flatMap(({ id, honorific }) => incompleteExamples(id, honorific.examples))).toEqual([]);
  });

  it('have correct samples with a translation and incorrect ones with a reason', () => {
    expect(sections.flatMap(({ id, honorific }) => incompleteSamples(id, honorific.correctIncorrect))).toEqual([]);
  });
});
