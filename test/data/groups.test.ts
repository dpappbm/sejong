import { describe, expect, it } from 'vitest';
import groups from '../../src/data/groups';
import type { FormGroup, RelatedGroup, ScaleGroup } from '../../src/data/types';
import { POINTS_BY_ID } from '../../src/lib/content';
import { groupPointIds } from '../../src/lib/groups';
import { plainText, textsOf } from '../../src/lib/richText';
import { incompleteSamples, partsOf } from '../helpers';

const all: RelatedGroup[] = groups;
const scales = all.filter((group): group is ScaleGroup => group.kind !== 'form');
const forms = all.filter((group): group is FormGroup => group.kind === 'form');

describe('groups of related points', () => {
  it('consist of existing points', () => {
    const missing = all.flatMap(group =>
      groupPointIds(group)
        .filter(id => !POINTS_BY_ID.has(id))
        .map(id => `${group.id}: ${id}`)
    );
    expect(missing).toEqual([]);
  });

  it('have complete members with an example and its translation', () => {
    const incomplete = forms.flatMap(group =>
      group.members
        .filter(
          ([, breakdown, hungarian, example]) =>
            !plainText(breakdown) || !hungarian || !plainText(example[0]) || !plainText(example[1])
        )
        .map(([id]) => `${group.id}: ${id}`)
    );
    expect(incomplete).toEqual([]);
  });

  // So that the look of the Korean texts can be changed in one place (_related.scss).
  it('mark the Korean texts of the descriptions with korean()', () => {
    const unmarked = all.flatMap(group => {
      const side = group.kind === 'form' ? [] : (group.side ?? []).map(([, text]) => text);
      return [...textsOf(group.explanation), ...side]
        .flatMap(partsOf)
        .filter(part => typeof part === 'string' || part.kind !== 'korean')
        .map(plainText)
        .filter(text => /[ㄱ-ㅎㅏ-ㅣ가-힣]/.test(text))
        .map(text => `${group.id}: ${text}`);
    });
    expect(unmarked).toEqual([]);
  });

  it('have translated examples', () => {
    const incomplete = scales.flatMap(group =>
      (group.examples ?? [])
        .filter(([korean, hungarian]) => !plainText(korean) || !plainText(hungarian))
        .map(([korean]) => `${group.id}: ${plainText(korean)}`)
    );
    expect(incomplete).toEqual([]);
  });

  it('have correct samples with a translation and incorrect ones with a reason', () => {
    expect(scales.flatMap(group => incompleteSamples(group.id, group.correctIncorrect))).toEqual([]);
  });
});
