import { describe, expect, it } from 'vitest';
import { numbersCards, numbersIntro } from '../../src/data/numbers';
import { examplesOf, plainText } from '../../src/lib/richText';
import { incompleteExamples, unlinkedMentions, untranslatedKorean } from '../helpers';

describe('numbers chapter', () => {
  it('has different ids', () => {
    const ids = numbersCards.map(card => card.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('translates or glosses every Korean cell', () => {
    expect(numbersCards.flatMap(card => untranslatedKorean(card.id, card.content))).toEqual([]);
  });

  it('has rows as wide as the header', () => {
    const uneven = numbersCards.flatMap(card =>
      card.content.flatMap(block =>
        block.kind === 'table'
          ? block.rows.filter(row => row.length !== block.headers.length).map(row => `${card.id}: ${plainText(row)}`)
          : []
      )
    );
    expect(uneven).toEqual([]);
  });

  it('has translated examples', () => {
    expect(numbersCards.flatMap(card => incompleteExamples(card.id, examplesOf(card.content)))).toEqual([]);
  });

  it('gives the references of the introduction with reference()', () => {
    const texts = numbersIntro.flatMap(block =>
      block.kind === 'list' ? block.items : 'content' in block ? block.content : []
    );
    expect(unlinkedMentions('introduction', texts)).toEqual([]);
  });
});
