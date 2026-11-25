import { describe, expect, it } from 'vitest';
import honorifics from '../../src/data/honorifics';
import type { HonorificsData, KoreanHungarian } from '../../src/data/types';
import { POINTS_BY_ID } from '../../src/lib/content';
import { incompleteSamples } from '../helpers';

const { categories }: HonorificsData = honorifics;
const rows = categories.flatMap(category =>
  category.rows.map((row, index) => ({ where: `${category.hungarian}, row ${index + 1}`, ...row }))
);
const isIncomplete = (pair: KoreanHungarian | null) => !!pair && (!pair[0] || !pair[1]);

describe('honorific words', () => {
  it('have Korean and Hungarian in every cell', () => {
    const incomplete = rows.filter(
      ({ base, honorific, example }) => isIncomplete(base) || isIncomplete(honorific) || isIncomplete(example)
    );
    expect(incomplete.map(row => row.where)).toEqual([]);
  });

  it('refer to existing points', () => {
    const missing = rows.flatMap(({ where, references = [] }) =>
      references.filter(id => !POINTS_BY_ID.has(id)).map(id => `${where}: ${id}`)
    );
    expect(missing).toEqual([]);
  });

  it('have correct samples with a translation and incorrect ones with a reason', () => {
    expect(categories.flatMap(category => incompleteSamples(category.hungarian, category.correctIncorrect))).toEqual(
      []
    );
  });
});
